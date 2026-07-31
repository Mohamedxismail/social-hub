import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const postId = req.nextUrl.searchParams.get("postId")
    const commentId = req.nextUrl.searchParams.get("commentId")
    const formData = await req.formData()
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,{
        method:"PUT",
        headers:{
            authorization:`Bearer ${token}`
        },
        body:formData,
    })
    const data = await res.json()
    return NextResponse.json(data, {
    status: res.status,
  })
    
}