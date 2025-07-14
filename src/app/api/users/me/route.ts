import  {getDataFromToken}  from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();
export async function GET(req: NextRequest) {
    try {
        const userId = getDataFromToken(req);
        const user = await User.findOne({_id: userId}).select('-password');
        console.log("User found:", user);
        return NextResponse.json({message: "User fetched successfully", data: user});
    } catch (error) {
        console.log("Error in Me:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
