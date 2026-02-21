
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Vehicle from "@/lib/models/Vehicle.schema";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query = status ? { status } : {};
    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json(
        { 
            error: "Failed to fetch vehicles" 
        }, { 
            status: 500
        }
    );
  }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const vehicle = await Vehicle.create(body);
        return NextResponse.json(vehicle, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { 
                    error: "License plate already exists" 
                }, { 
                    status: 409 
                });
        }
        return NextResponse.json(
            { 
                error: "Failed to create vehicle" 
            }, { 
                status: 500 
            }
        );
    }
}