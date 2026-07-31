import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const formData = await req.formData()
    const res = await fetch("https://route-posts.routemisr.com/posts",{
        method:"POST",
        headers:{
            authorization:`Bearer ${token}`
        },
        body:formData
    })

    const data = await res.json()
    return NextResponse.json(data)
    
}