import { getMyToken } from "@/utilities/token";
import { NextResponse } from "next/server";

export async function GET() {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const res = await fetch(`https://route-posts.routemisr.com/users/bookmarks`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();

    return NextResponse.json(data);

}