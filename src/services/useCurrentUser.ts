import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/myProfile`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }

  const data = await res.json();
  const user = data?.data?.user

  return user
}