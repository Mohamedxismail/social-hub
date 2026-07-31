import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_BASE_URL } from "@/config/api";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
     secret: process.env.NEXTAUTH_SECRET,
      session: {
    strategy: "jwt",
  },
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "mohamed@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            authorize: async function (credentials) {
                const response = await fetch(`${API_BASE_URL}/users/signin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });

                const payload = await response.json();
                console.log(payload);
                if (payload?.success && payload?.data?.token) {

                    const { id } = jwtDecode(payload.data.token) as { id: string };

                    return {
                        id: id,
                        user: payload.data.user,
                        token: payload.data.token
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user?.user
                token.token = user?.token
            }

            return token
        },
         async session({ session, token }) {
            if (token) {
                session.user = token?.user
                
            }
      return session
    }
    }
};

export default NextAuth(authOptions);