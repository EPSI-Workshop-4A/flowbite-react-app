import NextAuth from "next-auth"
import Auth0 from "next-auth/providers/auth0"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Auth0],
})
