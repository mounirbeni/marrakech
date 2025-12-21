
import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")
    const isOnLogin = req.nextUrl.pathname.startsWith("/login")

    if (isOnAdmin) {
        if (isLoggedIn) return
        return Response.redirect(new URL("/login", req.nextUrl))
    }

    if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL("/", req.nextUrl))
        return
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
