"use client";

import Link from "next/link";
import { Menu, Heart, Mail, User } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/contexts/WishlistContext";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { wishlistCount } = useWishlist();
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    const showSolidHeader = !isHome || isScrolled;

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollY;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setLastScrollY(latest);
        setIsScrolled(latest > 20);
    });

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Things to do", href: "/experiences" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "About", href: "/about" },
        { name: "Support", href: "/support" },
    ];

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={isHidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-colors duration-300",
                    showSolidHeader
                        ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
                        : "bg-transparent border-transparent"
                )}
            >
                <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between max-w-7xl">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 mr-6 group">
                        <Logo className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
                        <span className={cn(
                            "font-bold text-xl tracking-tight whitespace-nowrap font-serif",
                            showSolidHeader ? "text-foreground" : "text-foreground dark:text-white"
                        )}>
                            Explore Marrakech
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors relative group",
                                    showSolidHeader ? "text-foreground/80 hover:text-primary" : "text-foreground/90 hover:text-primary dark:text-white/90 dark:hover:text-white"
                                )}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        {/* Wishlist */}
                        <Link href="/wishlist">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "font-medium gap-2 relative transition-colors",
                                    showSolidHeader ? "text-foreground hover:text-primary hover:bg-primary/10" : "text-foreground hover:text-primary hover:bg-white/20 dark:text-white dark:hover:text-white"
                                )}
                            >
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Wishlist</span>
                                {wishlistCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground animate-in zoom-in">
                                        {wishlistCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>



                        {/* Theme Toggle */}
                        <div className={cn("ml-2", !showSolidHeader && "text-foreground dark:text-white")}>
                            <ThemeToggle />
                        </div>

                        {/* Login / My Account */}
                        <Link href="/login">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "ml-1",
                                    showSolidHeader ? "text-foreground hover:bg-secondary" : "text-foreground hover:bg-black/5 dark:text-white dark:hover:bg-white/20"
                                )}
                                title="My Account"
                            >
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/login">
                            <User className={cn("h-6 w-6 transition-colors", showSolidHeader ? "text-foreground" : "text-foreground dark:text-white")} />
                        </Link>

                        <Link href="/wishlist" className="relative">
                            <Heart className={cn("h-6 w-6 transition-colors", showSolidHeader ? "text-foreground" : "text-foreground dark:text-white")} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className={cn(showSolidHeader ? "text-foreground" : "text-foreground hover:bg-black/5 dark:text-white dark:hover:bg-white/20")}>
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l-border/50 bg-background/95 backdrop-blur-xl">
                                <div className="flex flex-col h-full">
                                    <div className="p-6 flex items-center justify-between border-b border-border/50">
                                        <SheetTitle className="font-serif text-xl font-bold text-foreground">Menu</SheetTitle>
                                        <ThemeToggle />
                                    </div>

                                    <nav className="flex-1 flex flex-col p-6 gap-2 overflow-y-auto">
                                        {navLinks.map((link, index) => (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
                                                >
                                                    <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                                                        {link.name}
                                                    </span>
                                                    <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </nav>


                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </motion.header>


        </>
    );
}
