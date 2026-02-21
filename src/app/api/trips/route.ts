
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Trip from "@/lib/models/Trip.schema";
import Vehicle from "@/lib/models/Vehicle.schema";
import Driver from "@/lib/models/Driver.schema";

export async function GET() {
  try {
    await connectDB();
    const trips = await Trip.find()
      .populate("vehicleId", "name licensePlate status")
      .populate("driverId", "name status")
      .sort({ createdAt: -1 });
    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json(
        { 
            error: "Failed to fetch trips" 
        }, { 
            status: 500 
        });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { vehicleId, driverId, cargoWeightKg, origin, destination } = body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || vehicle.status !== 'Available') {
      return NextResponse.json(
        { 
            error: "Vehicle is not available" 
        }, { 
            status: 400 
        });
    }
    if (cargoWeightKg > vehicle.maxCapacityKg) {
      return NextResponse.json(
        { 
            error: `Cargo exceeds max capacity of ${vehicle.maxCapacityKg}kg` 
        }, { 
            status: 400 
        });
    }

    const driver = await Driver.findById(driverId);
    if (!driver || driver.status !== 'Available') {
      return NextResponse.json(
        { 
            error: "Driver is not available" 
        }, { 
            status: 400 
        });
    }
    if (new Date(driver.licenseExpiry) < new Date()) {
      return NextResponse.json(
        { 
            error: "Driver's license is expired" 
        }, { 
            status: 400 
        });
    }

    const trip = await Trip.create({
      vehicleId,
      driverId,
      origin,
      destination,
      cargoWeightKg,
      status: 'Dispatched',
      startDate: new Date(),
    });

    await Vehicle.findByIdAndUpdate(vehicleId, 
        { 
            status: 'On Trip' 
        });
    await Driver.findByIdAndUpdate(driverId, 
        { 
            status: 'On Trip' 
        });

    return NextResponse.json(trip, { 
        status: 201 
    });

  } catch (error) {
    return NextResponse.json(
        { 
            error: "Failed to dispatch trip" 
        }, { 
            status: 500 
        });
  }
}