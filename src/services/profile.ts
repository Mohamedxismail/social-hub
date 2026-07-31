import { cookies } from "next/headers";

export async function getUserProfile(userId: string) {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/userProfile?userId=${userId}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  return res.json();
}