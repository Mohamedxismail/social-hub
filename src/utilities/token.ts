import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getMyToken() {

  const cookieStore = await cookies();

  const tokenCookie =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!tokenCookie) {
    return null;
  }

  const token = await decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token;
}