import { connect } from "@/db/dbConnection";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
import { verify } from "crypto";

connect(); // Connect to the database

interface UserDetails {
  email: string;
  password: string;
  userName: string;
}
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, password, userName }: UserDetails = req;

    if (!email || !password || userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isExist = await User.findOne({
      $or: [{ email, userName }],
    });

    if (isExist) {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({ email, password: hashedPassword, userName });
    const createdUser = await user.save();

    await sendEmail({ email, emailType: "verify", userId: createdUser._id });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup", error);
    return NextResponse.json(
      { error: "Something went wrong while register the user" },
      { status: 500 }
    );
  }
}
