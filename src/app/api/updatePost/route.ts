import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const formData = await req.formData()
    const postId = req.nextUrl.searchParams.get("postId")
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}`,{
        method:"PUT",
        headers:{
            authorization:`Bearer ${token}`
        },
        body:formData
    })
    const data = await res.json()
    return NextResponse.json(data)
    
}