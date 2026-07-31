import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    token: string
    user: {
      _id: string,
      name: string,
      username: string,
      email: string,
      photo: string,
      cover: ''
    }
  }
  interface Session {
    user: User.user
    }
  }
