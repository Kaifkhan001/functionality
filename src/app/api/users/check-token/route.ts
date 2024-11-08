/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function handler(req:any){

   const token = req.cookies.get("token");

   if(!token){
    return NextResponse.json({
        message:"Token not found",
    },
{
    status: 404
})
   }

   try {
    const isValid =  jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
    if(!isValid) {
        return NextResponse.json({
            message: "Invalid Credentials"
        },{status: 500})
    }
   } catch (error) {
    console.error("Error while fetching token", error);
    return NextResponse.json({
        message:"Token Fetching failed"
    },
{
    status: 403
})
   }
}