import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const userId = req.nextUrl.searchParams.get("userId")
    const res = await fetch(`https://route-posts.routemisr.com/users/${userId}/posts`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    })

    const data = await res.json()
    return NextResponse.json(data)
    
}