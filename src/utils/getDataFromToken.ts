import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("No token found");
    }
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken._id;
  } catch (error: any) {
    throw new Error("Error getting data", error.message);
  }
};
