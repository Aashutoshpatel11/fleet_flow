import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import User from "@/lib/models/User.schema";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {

    // 1. Find user
    // 2. Verify password
    // 3. Create JWT Payload (include role for RBAC)
    // 4. Set HttpOnly Cookie

    try {
        await connectDB();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user || !user.isActive) {
            return NextResponse.json(
                { 
                    error: "Invalid credentials" 
                }, { 
                    status: 401 
                }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return NextResponse.json({ 
                error: "Wrong password" 
            }, { 
                status: 401 
                }
            );
        }

        const token = await signToken({
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        });

        const response = NextResponse.json(
            { 
                success: true, 
                role: user.role 
            }
        );

        response.cookies.set({
            name: "fleet_token",
            value: token,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 8,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ 
            error: "Internal Server Error" 
        }, { 
            status: 500 
        });
    }
}