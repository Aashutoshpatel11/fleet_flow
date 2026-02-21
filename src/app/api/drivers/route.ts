import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Driver from "@/lib/models/Driver.schema";

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        const query = status ? { status } : {};
        const drivers = await Driver.find(query).sort({ createdAt: -1 });
        
        return NextResponse.json(drivers);
    } catch (error) {
        return NextResponse.json(
            { 
                error: "Failed to fetch drivers" 
            }, { 
                status: 500 
            });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const driver = await Driver.create(body);
        return NextResponse.json(driver, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
        return NextResponse.json(
            { 
                error: "License number already exists" 
            }, { 
                status: 409 
            });
        }
        return NextResponse.json(
            { 
                error: "Failed to create driver" 
            }, { 
                status: 500 
            });
    }
}