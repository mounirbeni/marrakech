"use client";

import Link from "next/link";
import { Menu, User, Settings, LogOut } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SearchBar } from "@/components/shared/SearchBar";

interface UserData {
    id: string;
    email: string;
    name: string | null;
    role: string;
}

export function Header() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navLinks = [
        { name: "Things to do", href: "/search" },
        { name: "Become suppliers", href: "/become-supplier" },
    ];

    useEffect(() => {
        fetchUser();

        // Scroll detection
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            toast.success("Logged out successfully");
            router.push('/');
        } catch (error) {
            toast.error("Failed to logout");
        }
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/search');
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "h-[80px] bg-white/95 backdrop-blur-md shadow-lg"
            : "h-[80px] bg-white border-b border-[#E0E0E0]"
            }`}>
            <div className="container mx-auto h-full px-4 flex items-center justify-between gap-4 max-w-[1400px]">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Logo className="h-8 w-8 text-[#FF5F00]" />
                    <span className="font-bold text-[24px] tracking-tight text-black font-sans whitespace-nowrap">
                        Explore Marrakech
                    </span>
                </Link>

                {/* Center: Compact Search Bar (only when scrolled, desktop only) */}
                <div className={`hidden md:block transition-all duration-300 ${isScrolled ? "opacity-100 w-full max-w-[420px]" : "opacity-0 w-0 overflow-hidden"
                    }`}>
                    <SearchBar
                        variant="compact"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSubmit={handleSearch}
                    />
                </div>

                {/* Right: Navigation & User Menu */}
                <div className="hidden md:flex items-center gap-1 shrink-0">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-black font-medium hover:bg-gray-100 px-4 py-2.5 rounded-full transition-colors text-[14px] whitespace-nowrap"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {!isLoading && (
                        <>
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="ml-2 gap-2 rounded-full px-3">
                                            <Avatar className="h-8 w-8 border-2 border-[#FF5F00]">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`} />
                                                <AvatarFallback>{user.name?.[0] || user.email[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-[14px] font-medium">{user.name || "Account"}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">{user.name || "User"}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="cursor-pointer">
                                                <User className="mr-2 h-4 w-4" />
                                                My Account
                                            </Link>
                                        </DropdownMenuItem>
                                        {user.role === 'ADMIN' && (
                                            <DropdownMenuItem asChild>
                                                <Link href="/admin" className="cursor-pointer">
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Control Panel
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href="/login" className="ml-2">
                                    <Button
                                        className="bg-[#FF5F00] hover:bg-[#E55500] text-white rounded-full px-6 py-2.5 font-bold h-[40px] text-[14px] shadow-none"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-4">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
                            <div className="flex flex-col h-full mt-6">
                                <SheetTitle className="sr-only">Menu</SheetTitle>
                                <nav className="flex flex-col gap-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-lg font-medium text-black py-3 px-4 hover:bg-gray-50 rounded-lg"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <div className="w-full h-px bg-gray-100 my-2" />
                                    {user ? (
                                        <>
                                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium text-black py-3 px-4 hover:bg-gray-50 rounded-lg">
                                                <Settings className="inline mr-2 h-5 w-5" />
                                                Dashboard
                                            </Link>
                                            <Link href="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-black py-3 px-4 hover:bg-gray-50 rounded-lg">
                                                <User className="inline mr-2 h-5 w-5" />
                                                My Account
                                            </Link>
                                            {user.role === 'ADMIN' && (
                                                <Link href="/admin" onClick={() => setIsOpen(false)} className="text-lg font-medium text-black py-3 px-4 hover:bg-gray-50 rounded-lg">
                                                    <Settings className="inline mr-2 h-5 w-5" />
                                                    Control Panel
                                                </Link>
                                            )}
                                            <Button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsOpen(false);
                                                }}
                                                variant="ghost"
                                                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <LogOut className="mr-2 h-5 w-5" />
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <Link href="/login" onClick={() => setIsOpen(false)}>
                                            <Button className="w-full bg-[#FF5F00] hover:bg-[#E55500] text-white rounded-full font-bold">
                                                Sign In
                                            </Button>
                                        </Link>
                                    )}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
