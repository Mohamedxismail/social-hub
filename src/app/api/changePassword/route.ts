import { getMyToken } from "@/utilities/token";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest) {
    const tokenv = await getMyToken()
    const token = tokenv?.token
    const body = await req.json();
    const res = await fetch("https://route-posts.routemisr.com/users/change-password",{
        method:"PATCH",
        headers:{
            "Content-Type": "application/json" , 
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(body),
    })
    const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
    
}