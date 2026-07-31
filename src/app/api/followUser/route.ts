import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const userId = req.nextUrl.searchParams.get("userId")
    const res = await fetch(`https://route-posts.routemisr.com/users/${userId}/follow`,{
        method:"PUT",
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    const data = await res.json()
    return NextResponse.json(data)
    
}