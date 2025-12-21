
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                // Logic to verify user password
                // For now, return a mock user or check DB
                // We'll implement actual bcrypt check later
                return null
            }
        })
    ],
    callbacks: {
        session({ session, user }) {
            // session.user.role = user.role
            return session
        }
    }
}) 
