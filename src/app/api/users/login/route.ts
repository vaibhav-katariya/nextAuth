import { connect } from "@/db/dbConnection";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect(); // Connect to the database

interface UserDetails {
  email: string;
  password: string;
}
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, password }: UserDetails = req;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid password and email" },
        { status: 401 }
      );
    }

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const res = NextResponse.json(
      { message: "User login successfully" },
      { status: 201 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res;
  } catch (error) {
    console.error("Error in login user", error);
    return NextResponse.json(
      { error: "Something went wrong while login the user" },
      { status: 500 }
    );
  }
}
