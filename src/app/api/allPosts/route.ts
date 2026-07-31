// import { NextRequest, NextResponse } from "next/server";
// import { getMyToken } from "@/utilities/token";

// export async function GET(req: NextRequest) {
  
//     const token = await getMyToken();

//     const  res  = await fetch(
//       "https://route-posts.routemisr.com/posts",
//       {
//         method:"GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//   const data = await res.json();

//     return NextResponse.json(data);
  

   
  
// }