"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DashboardSidebar } from "./DashboardSidebar";

export function DashboardHeader() {
    return (
        <header className="h-16 border-b bg-card/50 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 border-r w-72">
                        <DashboardSidebar className="border-none" />
                    </SheetContent>
                </Sheet>
                <span className="font-bold text-lg">Marrakech</span>
            </div>

            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search bookings or experiences..."
                        className="pl-9 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                        <div className="p-4 border-b">
                            <h4 className="font-semibold leading-none">Notifications</h4>
                        </div>
                        <div className="grid gap-1 p-1">
                            {[
                                { title: "Booking Confirmed", desc: "Your trip to Atlas Mountains is set!", time: "2m ago", unread: true },
                                { title: "Welcome!", desc: "Thanks for joining Marrakech Escapes.", time: "1d ago", unread: false }
                            ].map((item, i) => (
                                <div key={i} className={`flex flex-col gap-1 p-3 rounded-lg hover:bg-muted/50 transition-colors ${item.unread ? 'bg-primary/5' : ''}`}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{item.title}</span>
                                        <span className="text-xs text-muted-foreground">{item.time}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-2 border-t text-center">
                            <Button variant="ghost" size="sm" className="w-full text-xs h-auto py-1.5">Mark all as read</Button>
                        </div>
                    </PopoverContent>
                </Popover>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-9 w-9 border-2 border-primary/10">
                                <AvatarImage src="/avatars/01.png" alt="@user" />
                                <AvatarFallback>M</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Mounir</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    mounir@example.com
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={async () => {
                                await fetch('/api/auth/logout', { method: 'POST' });
                                window.location.href = '/login';
                            }}
                        >
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
