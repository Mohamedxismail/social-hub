import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req:NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
     const postId = req.nextUrl.searchParams.get("postId");
    const commentId = req.nextUrl.searchParams.get("commentId");
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,{
        method:"DELETE",
        headers:{
            authorization:`Bearer ${token }`
        }

    })
    const data = await res.json()
    return NextResponse.json(data)
    
}