import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import User from "@/lib/models/User.schema";

export async function POST(req: Request) {
    // 1. Establish database connection
    // 2. Extract user details from the request body
    // 3. Basic validation
    // Ensure the role is one of our allowed enums
    // 4. Check if a user with this email already exists
    // 5. Hash the password securely
    // 6. Create and save the new user to MongoDB
    // 7. Return success response (NEVER return the password hash to the client)
  try {
    
    await connectDB();
    
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { 
            error: "Missing required fields (name, email, password, role)" 
        }, 
        { 
            status: 400 
        }
      );
    }

    const allowedRoles = ['Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'];
    if (!allowedRoles.includes(role)) {
        return NextResponse.json(
            { 
                error: "Invalid role specified" 
            }, { 
                status: 400 
            }
        );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { 
            error: "A user with this email already exists" 
        }, { 
            status: 409 
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      passwordHash,
      role,
      isActive: true, 
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
        { 
            error: "Internal Server Error" 
        },{ 
            status: 500 
        }
    );
  }
}