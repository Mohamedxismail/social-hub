import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const postId = req.nextUrl.searchParams.get("postId")
    const res = await fetch(`https://route-posts.routemisr.com/posts/${postId}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`

        }
    })
    const data = await res.json()
    return NextResponse.json(data)

}