/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import connect from '@/helpers/dbConfig';

export async function POST(request: NextRequest){
    await connect();
    const reqBody = await request.json();
    const {email, password} = reqBody;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({
                message: "User Doesn't exists"
            },
        {
            status: 409
        });
        }
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({
                message: "Invalid credentials"
            },
        {
            status: 409
        })
        };
        const token = await user.generateAccessToken();
        const userInfoToken = await user.generateUserInfoToken();

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true
        });


    
    if (token) {
         response.cookies.set("token", token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "strict", 
           maxAge: 3600000,
         });
       }
    if(userInfoToken){
        response.cookies.set("userInfo", userInfoToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000,
        });
    }

        return response;

    } catch (error:any) {
        console.log("Error while login in route file", error);
        return NextResponse.json({
            message:"Error while loggin",
            success: false
        },
    {
        status: 400
    })
    }
}