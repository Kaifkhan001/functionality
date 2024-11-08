/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import {  NextResponse } from "next/server"
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function GET(req: any){
    try {
        const token = await req.cookies.get("userInfo")?.value;
        
        if(!token){
            return NextResponse.json({
                message: "TOken Not Found"
            },{status: 404})
        }

        const decodeToken = await jwt.verify(
          token,
          process.env.JWT_TOKEN_SECRET as  string
        ) as JwtPayload;

        const userId = decodeToken?.id;

        const user = await User.findOne({ _id : userId });
        console.log("UserId: -",user);

        if(!user){
            return NextResponse.json({
                message: "User Not found"
            }, {status: 404})
        }

        return NextResponse.json({user});
    } catch (error) {
        console.log("Error while extracting user info", error);
        return NextResponse.json({
            message: "Error Retreiving User Info"
        },
    {
        status: 404
    })
    }
}