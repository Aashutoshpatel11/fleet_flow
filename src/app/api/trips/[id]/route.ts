import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Trip from "@/lib/models/Trip.schema";
import Vehicle from "@/lib/models/Vehicle.schema";
import Driver from "@/lib/models/Driver.schema";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
    
    // 1. Find the existing trip
    // 2. Handle Trip Completion Logic
    // Update the Trip record
    // Update the Vehicle: Set to Available and update the odometer
    // Update the Driver: Set to Available
    // 3. Handle generic updates (like cancelling a trip)
    
    try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const { status, finalOdometer, revenue } = body;

    const trip = await Trip.findById(id);
    if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

        if (status === 'Completed' && trip.status !== 'Completed') {
        if (!finalOdometer) {
            return NextResponse.json({ error: "Final odometer reading is required to complete a trip" }, { status: 400 });
        }

        trip.status = 'Completed';
        trip.endDate = new Date();

        if (revenue) trip.revenue = revenue; 
        await trip.save();

        await Vehicle.findByIdAndUpdate(trip.vehicleId, { 
            status: 'Available',
            currentOdometer: finalOdometer 
        });

        await Driver.findByIdAndUpdate(trip.driverId, { status: 'Available' });

        return NextResponse.json({ success: true, trip });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(updatedTrip);

  } catch (error) {

    return NextResponse.json(
        { 
            error: "Failed to update trip" 
        }, { 
            status: 500 
        });
  }
}