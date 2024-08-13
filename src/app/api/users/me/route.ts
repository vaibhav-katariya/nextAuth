import { connect } from "@/db/dbConnection";
import { User } from "@/models/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getData(request);
    if (!userId) {
      return NextResponse.json(
        { error: "No user found in the token" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in getting user", error);
    return NextResponse.json(
      { error: "Something went wrong while getting the user" },
      { status: 500 }
    );
  }
}
