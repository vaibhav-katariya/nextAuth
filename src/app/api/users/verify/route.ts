import { connect } from "@/db/dbConnection";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect(); // Connect to the database

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { token } = req;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token or token expired" },
        { status: 401 }
      );
    }

    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
      verifyToken: null,
      verifyTokenExpires: null,
    });

    await user.save();

    return NextResponse.json(
      { message: "User verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in verify user", error);
    return NextResponse.json(
      { error: "Something went wrong while verify the user" },
      { status: 500 }
    );
  }
}
