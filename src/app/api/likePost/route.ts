import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const tokenv = await getMyToken();
  const token = tokenv?.token

  const { postId } = await req.json();

  const res = await fetch(
    `https://route-posts.routemisr.com/posts/${postId}/like`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    }
    
    
  );

  const data = await res.json();

  return NextResponse.json(data);
}