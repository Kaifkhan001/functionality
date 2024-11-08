/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connect from '@/helpers/dbConfig.js';
import User from "@/models/userModel";
import bcryptjs, { hashSync } from 'bcryptjs';


export async function POST(request: NextRequest){
    await connect();
    try {
        const reqBody = await request.json();
        const { fullName, username, email, password } = reqBody;

        const user = await User.findOne({
            $or: [{email:email}, {username: username}]
        });

        if(user){
            return NextResponse.json(
                {
                    message: "User already existssss"
                    
                },
                {
                    status: 409
                }
            );
        };

        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return NextResponse.json(
            {
                message: "User created successfull",
                data: newUser
            },
            {
                status: 200
            }
        );


    } catch (error: any) {
        console.log("Error in sign-up in routing file", error);
        return NextResponse.json(
          {
            message: "Something went wrong during sign-up.",
            error: error.message,
          },
          {
            status: 500,
          }
        );
    }
}