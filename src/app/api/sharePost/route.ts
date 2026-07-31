import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const postId = req.nextUrl.searchParams.get("postId")
    const {body} = await req.json()
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}/share`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            body,
        })

        
    })
    const data = await res.json()
    return NextResponse.json(data)

}