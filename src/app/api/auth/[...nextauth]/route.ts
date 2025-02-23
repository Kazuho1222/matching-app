import { authConfig } from "@/lib/auth"
import { NextAuth } from "@auth/nextjs"

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }
