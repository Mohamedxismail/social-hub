import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";
type DecodedToken = {
  token: string;
  user: {
    _id: string;
  };
};

export async function GET(req: NextRequest) {
  const tokenv = (await getMyToken()) as DecodedToken;
  const token = tokenv.token;
  const myId = tokenv.user._id;
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "userId is required" },
      { status: 400 }
    );
  }
  const url =
    myId === userId
      ? `https://route-posts.routemisr.com/users/${userId}/profile`
      : `https://route-posts.routemisr.com/users/${userId}/profile`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json({...data, isMyProfile: myId === userId, });
}