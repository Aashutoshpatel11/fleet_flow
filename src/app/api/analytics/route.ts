import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Vehicle from "@/lib/models/Vehicle.schema";

export async function GET() {
try {
    await connectDB();

    const fleetStatusCounts = await Vehicle.aggregate([
    {
        $group: {
            _id: "$status",
            count: { $sum: 1 }
        }
    }
    ]);

    const kpis = fleetStatusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
    }, {});

    const vehicleAnalytics = await Vehicle.aggregate([
    {
        $lookup: {
            from: "trips",
            localField: "_id",
            foreignField: "vehicleId",
            as: "trips"
        }
    },
    {
        $lookup: {
            from: "expenses",
            localField: "_id",
            foreignField: "vehicleId",
            as: "expenses"
        }
    },
    {
        $project: {
            name: 1,
            licensePlate: 1,
            acquisitionCost: 1,
            currentOdometer: 1,
            totalRevenue: { $sum: "$trips.revenue" },
            totalFuelCost: {
                $sum: {
                $map: {
                    input: { $filter: { input: "$expenses", as: "e", cond: { $eq: ["$$e.type", "Fuel"] } } },
                    as: "fuel",
                    in: "$$fuel.amount"
                }
                }
        },
        totalMaintenanceCost: {
            $sum: {
            $map: {
                input: { $filter: { input: "$expenses", as: "e", cond: { $eq: ["$$e.type", "Maintenance"] } } },
                as: "maint",
                in: "$$maint.amount"
            }
            }
        },
        totalLitersLogged: { $sum: "$expenses.litersLogged" }
        }
    },
    {
        $addFields: {
        totalExpenses: { $add: ["$totalFuelCost", "$totalMaintenanceCost"] },
        roiPercentage: {
            $cond: [
            { $gt: ["$acquisitionCost", 0] },
            { 
                $multiply: [
                { $divide: [{ $subtract: ["$totalRevenue", { $add: ["$totalFuelCost", "$totalMaintenanceCost"] }] }, "$acquisitionCost"] }, 
                100 
                ]
            },
            0
            ]
        },
        fuelEfficiencyKmL: {
            $cond: [
            { $gt: ["$totalLitersLogged", 0] },
            { $divide: ["$currentOdometer", "$totalLitersLogged"] },
            0
            ]
        }
        }
    }
    ]);

    return NextResponse.json({
        kpis,
        vehicleAnalytics
    });

} catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json(
        { 
            error: "Failed to fetch analytics" 
        }, { 
            status: 500 
        });
}
}