import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const {postId,commentId} = await req.json();
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,{
        method:"PUT",
        headers:{
            authorization:`Bearer ${token}`
        }

    })
    
    
    const data = await res.json()
    console.log(data);
    return NextResponse.json(data)
    
}