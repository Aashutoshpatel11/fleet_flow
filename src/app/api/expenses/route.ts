import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Expense from "@/lib/models/Expense.schema";
import Vehicle from "@/lib/models/Vehicle.schema";

export async function GET(req: Request) {
    try {

        await connectDB();

        const expenses = await Expense.find()
        .populate("vehicleId", "name licensePlate")
        .sort({ date: -1 });

        return NextResponse.json(expenses);

    } catch (error) {
        return NextResponse.json(
            { 
                error: "Failed to fetch expenses" 
            }, { 
                status: 500 
            });
    }
}

export async function POST(req: Request) {
    try {

        await connectDB();

        const body = await req.json();
        const { vehicleId, type, amount, description, litersLogged, date } = body;

        const expense = await Expense.create({
        vehicleId,
        type,
        amount,
        description,
        litersLogged,
        date: date || new Date()
        });

        if (type === 'Maintenance') {
        await Vehicle.findByIdAndUpdate(vehicleId, 
            { 
                status: 'In Shop' 
            });
        }

        return NextResponse.json(expense, { status: 201 });

    } catch (error) {

        return NextResponse.json(
            { 
                error: "Failed to log expense" 
            }, { 
                status: 500 
            });
    }
}