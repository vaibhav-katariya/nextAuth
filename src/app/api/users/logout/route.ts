import { connect } from "@/db/dbConnection";
import { NextRequest, NextResponse } from "next/server";

connect(); // Connect to the database

export async function POST(request: NextRequest) {
  try {
    const res = NextResponse.json({
      message: "user logout success",
      status: 200,
    });
    res.cookies.set("token", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res;
  } catch (error) {
    console.error("Error in logout user", error);
    return NextResponse.json(
      { error: "Something went wrong while logout the user" },
      { status: 500 }
    );
  }
}
