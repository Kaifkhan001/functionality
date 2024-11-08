import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "User Logged out successfully",
            success: true
        });

        response.cookies.delete("token");
        return response;
    } catch (error) {
        console.log("Error While Logout",error);
        return;
    }
}