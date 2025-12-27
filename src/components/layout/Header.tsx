"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    Menu, X, Search, User, LogOut, LayoutDashboard,
    Heart, ShoppingBag, ChevronDown
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/shared/Logo";

const navLinks = [
    { href: "/search", label: "Experiences" },
    { href: "/about", label: "About Us" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/support", label: "Support" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
                    : "bg-white/50 backdrop-blur-sm py-4"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-50">
                        {/* Assuming Logo component takes className or similar, 
                 but sticking to simple link wrapper if Logo text is internal */}
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF5F00] to-[#E55500]">
                                Explore Marrakesh
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-[#FF5F00]",
                                    pathname === link.href ? "text-[#FF5F00]" : "text-gray-700"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/search">
                            <Button variant="ghost" size="icon" className="hover:text-[#FF5F00]">
                                <Search className="w-5 h-5" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </Link>

                        {isLoading ? (
                            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                        ) : session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-full border-gray-200 pl-2 pr-4 bg-white hover:bg-gray-50">
                                        <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center mr-2 text-[#FF5F00]">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="max-w-[100px] truncate">{session.user?.name?.split(' ')[0] || 'User'}</span>
                                        <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/bookings" className="cursor-pointer">
                                            <ShoppingBag className="w-4 h-4 mr-2" />
                                            My Bookings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/wishlist" className="cursor-pointer">
                                            <Heart className="w-4 h-4 mr-2" />
                                            Wishlist
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-600 focus:text-red-600 cursor-pointer"
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button className="bg-[#FF5F00] hover:bg-[#E55500] text-white rounded-full font-bold px-6 shadow-md shadow-orange-500/20">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 text-gray-800"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-4 pb-8 flex flex-col overflow-y-auto animate-fade-in">
                    <nav className="flex flex-col space-y-6 mb-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-lg font-medium py-2 border-b border-gray-100",
                                    pathname === link.href ? "text-[#FF5F00]" : "text-gray-900"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto space-y-4">
                        {session ? (
                            <>
                                <div className="flex items-center gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-[#FF5F00] flex items-center justify-center text-white">
                                        <span className="font-bold text-lg">{session.user?.name?.[0]?.toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold">{session.user?.name}</p>
                                        <p className="text-sm text-gray-500">{session.user?.email}</p>
                                    </div>
                                </div>
                                <Link href="/dashboard">
                                    <Button className="w-full justify-start mb-2" variant="outline">
                                        <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                >
                                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                                </Button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/login" className="w-full">
                                    <Button variant="outline" className="w-full h-12 text-base">Log In</Button>
                                </Link>
                                <Link href="/register" className="w-full">
                                    <Button className="w-full h-12 bg-[#FF5F00] hover:bg-[#E55500] text-base">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
