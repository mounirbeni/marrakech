import { SignJWT, jwtVerify, JWTPayload } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key-change-this-in-prod'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key)
}

export async function decrypt(input: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch {
        return null
    }
}

export async function login() {
    // Verify credentials and create session
    // This function will be called from the server action or API route
    // For now, we'll just handle the session creation part here
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    if (!session) return null
    return await decrypt(session)
}

import { NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value
    if (!session) return

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session) as any
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    // const res = new Response(null) // This needs to be handled in middleware
    // In middleware we just return the response with the new cookie
}
