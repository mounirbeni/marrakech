'use client'

import { usePathname } from 'next/navigation'
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/shared/WhatsAppButton"
import SkipLink from "@/components/shared/SkipLink"

export function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin')

    if (isAdmin) {
        return <>{children}</>
    }

    return (
        <>
            <SkipLink />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}
