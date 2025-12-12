"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
    Loader2, MessageSquare, Star, LogOut, Send, LayoutDashboard,
    Calendar, Settings, XCircle, Edit3, User, CheckCircle, AlertCircle, Plus, Clock, CheckCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("overview");
    const [isLoading, setIsLoading] = useState(true);

    // Chat
    const [newMessage, setNewMessage] = useState("");
    const [sendingMsg, setSendingMsg] = useState(false);
    const [showNewTicketForm, setShowNewTicketForm] = useState(false);

    // Review
    const [reviewBooking, setReviewBooking] = useState<any>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    // Modify Request
    const [modifyBooking, setModifyBooking] = useState<any>(null);
    const [modifyRequest, setModifyRequest] = useState("");
    const [submittingModify, setSubmittingModify] = useState(false);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (!data.user) {
                    router.push('/login');
                } else {
                    setUser(data.user);
                    fetchData();
                }
            })
            .catch(() => router.push('/login'));
    }, [router]);

    useEffect(() => {
        if (activeTab === 'messages' && user) {
            fetchConversations();
            if (selectedConversation) {
                fetchMessages(selectedConversation);
                const interval = setInterval(() => fetchMessages(selectedConversation), 3000);
                return () => clearInterval(interval);
            }
        }
    }, [activeTab, user, selectedConversation]);

    const fetchData = async () => {
        try {
            const bookingsRes = await fetch('/api/my-bookings');
            if (bookingsRes.ok) setBookings(await bookingsRes.json());
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchConversations = async () => {
        try {
            const res = await fetch('/api/conversations');
            if (res.ok) {
                const convos = await res.json();
                setConversations(convos);
                if (!selectedConversation && convos.length > 0 && !showNewTicketForm) {
                    setSelectedConversation(convos[0].id);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMessages = async (conversationId: string) => {
        try {
            const res = await fetch(`/api/conversations/${conversationId}`);
            if (res.ok) {
                const msgs = await res.json();
                setMessages(msgs);

                // Also refresh conversation status to detect if admin closed it
                const convoRes = await fetch('/api/conversations');
                if (convoRes.ok) {
                    const convos = await convoRes.json();
                    setConversations(convos);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'CANCELLED' })
            });

            if (res.ok) {
                toast.success("Booking cancelled successfully");
                fetchData();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to cancel booking");
            }
        } catch (error) {
            toast.error("Failed to cancel booking");
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        setSendingMsg(true);
        try {
            const res = await fetch(`/api/conversations/${selectedConversation}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMessage })
            });

            if (res.ok) {
                const msg = await res.json();
                setMessages([...messages, msg]);
                setNewMessage("");
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || "Failed to send message");
            }
        } finally {
            setSendingMsg(false);
        }
    };

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const subject = formData.get('subject') as string;
        const description = formData.get('description') as string;

        if (!subject.trim() || !description.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setSendingMsg(true);
        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, content: description })
            });

            if (res.ok) {
                const newConvo = await res.json();
                toast.success("Ticket submitted successfully!");
                setShowNewTicketForm(false);
                setSelectedConversation(newConvo.id);
                fetchConversations();
                (e.target as HTMLFormElement).reset();
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || "Failed to create ticket");
            }
        } finally {
            setSendingMsg(false);
        }
    };

    const handleSubmitModifyRequest = async () => {
        if (!modifyBooking || !modifyRequest.trim()) return;
        setSubmittingModify(true);
        try {
            const subject = `Modification Request - ${modifyBooking.activityTitle}`;
            const content = `Booking ID: ${modifyBooking.id}\nActivity: ${modifyBooking.activityTitle}\nDate: ${format(new Date(modifyBooking.date), "PPP")}\n\nRequested Changes:\n${modifyRequest}`;

            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, content })
            });

            if (res.ok) {
                toast.success("Modification request sent!");
                setModifyBooking(null);
                setModifyRequest("");
                setActiveTab('messages');
                fetchConversations();
            }
        } finally {
            setSubmittingModify(false);
        }
    };

    const handleSubmitReview = async () => {
        if (!reviewBooking) return;
        setSubmittingReview(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: reviewBooking.id,
                    rating,
                    comment
                })
            });

            if (res.ok) {
                toast.success("Review submitted! Thank you.");
                setReviewBooking(null);
                setComment("");
                setRating(5);
                fetchData();
            } else {
                toast.error("Failed to submit review");
            }
        } finally {
            setSubmittingReview(false);
        }
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;
    }

    const tabs = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "bookings", label: "My Bookings", icon: Calendar },
        { id: "messages", label: "Support", icon: MessageSquare },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const stats = {
        total: bookings.length,
        active: bookings.filter(b => b.status === 'PENDING' || b.status === 'CONFIRMED').length,
        completed: bookings.filter(b => b.status === 'COMPLETED').length,
        cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
    };

    const selectedConvo = conversations.find(c => c.id === selectedConversation);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black/5">
            {/* Header */}
            <div className="border-b bg-white dark:bg-black/20 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold">My Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
                </div>
            </div>

            <div className="container mx-auto p-6 flex gap-6">
                {/* Sidebar */}
                <aside className="w-64 space-y-2 hidden md:block">
                    <Card className="flex flex-col h-[calc(100vh-140px)]">
                        <CardContent className="p-3 flex-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                                        activeTab === tab.id
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </CardContent>
                        <div className="p-3 border-t">
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </div>
                    </Card>
                </aside>

                {/* Mobile Tab Selector */}
                <div className="md:hidden w-full mb-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.id}
                                variant={activeTab === tab.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveTab(tab.id)}
                                className="gap-2 whitespace-nowrap"
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 space-y-6">
                    {activeTab === 'overview' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{stats.total}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-blue-600">{stats.active}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Cancelled</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-red-600">{stats.cancelled}</div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Bookings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {bookings.slice(0, 5).map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between py-3 border-b last:border-0">
                                            <div>
                                                <p className="font-medium">{booking.activityTitle}</p>
                                                <p className="text-sm text-muted-foreground">{format(new Date(booking.date), "PPP")}</p>
                                            </div>
                                            <Badge className={
                                                booking.status === 'CONFIRMED' ? 'bg-green-500' :
                                                    booking.status === 'CANCELLED' ? 'bg-red-500' :
                                                        booking.status === 'COMPLETED' ? 'bg-orange-500' :
                                                            'bg-yellow-500'
                                            }>
                                                {booking.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {activeTab === 'bookings' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Bookings</CardTitle>
                                <CardDescription>Manage and track your reservations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Activity</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Guests</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {bookings.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center h-24">
                                                        No bookings found.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                bookings.map((booking) => (
                                                    <TableRow key={booking.id}>
                                                        <TableCell className="font-mono text-xs">{booking.id.slice(0, 8)}</TableCell>
                                                        <TableCell className="font-medium">{booking.activityTitle}</TableCell>
                                                        <TableCell>{format(new Date(booking.date), "PP")}</TableCell>
                                                        <TableCell>{booking.guests}</TableCell>
                                                        <TableCell>
                                                            <Badge className={
                                                                booking.status === 'CONFIRMED' ? 'bg-green-500 hover:bg-green-600' :
                                                                    booking.status === 'CANCELLED' ? 'bg-red-500 hover:bg-red-600' :
                                                                        booking.status === 'COMPLETED' ? 'bg-orange-500 hover:bg-orange-600' :
                                                                            'bg-yellow-500 hover:bg-yellow-600'
                                                            }>
                                                                {booking.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right space-x-2">
                                                            {booking.status === 'PENDING' && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() => setModifyBooking(booking)}
                                                                        className="gap-1"
                                                                    >
                                                                        <Edit3 className="w-3 h-3" /> Modify
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="destructive"
                                                                        onClick={() => handleCancelBooking(booking.id)}
                                                                        className="gap-1"
                                                                    >
                                                                        <XCircle className="w-3 h-3" /> Cancel
                                                                    </Button>
                                                                </>
                                                            )}
                                                            {booking.status === 'COMPLETED' && !booking.review && (
                                                                <Button size="sm" onClick={() => setReviewBooking(booking)} className="gap-1">
                                                                    <Star className="w-3 h-3" /> Rate
                                                                </Button>
                                                            )}
                                                            {booking.review && (
                                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                    <CheckCircle className="w-3 h-3 text-green-600" /> Reviewed
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'messages' && (
                        <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-220px)]">
                            {/* Sidebar / Conversation List */}
                            <div className={cn(
                                "w-full md:w-80 flex flex-col gap-4",
                                selectedConversation && "hidden md:flex"
                            )}>
                                {/* Create New Ticket Button */}
                                <Button
                                    onClick={() => {
                                        setShowNewTicketForm(true);
                                        setSelectedConversation(null);
                                    }}
                                    className="w-full gap-2"
                                    size="lg"
                                >
                                    <Plus className="w-5 h-5" />
                                    Create New Ticket
                                </Button>

                                {/* Conversation List */}
                                <Card className="flex-1 overflow-hidden flex flex-col">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">Your Tickets</CardTitle>
                                        <CardDescription>{conversations.length} conversation{conversations.length !== 1 ? 's' : ''}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0 flex-1 overflow-y-auto">
                                        {conversations.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                                <MessageSquare className="w-12 h-12 text-muted-foreground/50 mb-3" />
                                                <p className="text-sm text-muted-foreground">No tickets yet</p>
                                                <p className="text-xs text-muted-foreground mt-1">Create your first support ticket</p>
                                            </div>
                                        ) : (
                                            conversations.map((conv) => (
                                                <button
                                                    key={conv.id}
                                                    onClick={() => {
                                                        setSelectedConversation(conv.id);
                                                        setShowNewTicketForm(false);
                                                    }}
                                                    className={cn(
                                                        "w-full p-4 border-b text-left transition-colors hover:bg-secondary/50",
                                                        selectedConversation === conv.id && "bg-secondary"
                                                    )}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <p className="font-medium text-sm truncate pr-2">{conv.subject}</p>
                                                        <Badge variant={conv.status === 'OPEN' ? 'default' : 'secondary'} className="shrink-0">
                                                            {conv.status === 'OPEN' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCheck className="w-3 h-3 mr-1" />}
                                                            {conv.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {format(new Date(conv.updatedAt), "PPp")}
                                                    </p>
                                                    {conv.messages && conv.messages[0] && (
                                                        <p className="text-xs text-muted-foreground truncate mt-2">
                                                            {conv.messages[0].content.substring(0, 60)}...
                                                        </p>
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Main Chat Area */}
                            <div className={cn(
                                "flex-1",
                                !selectedConversation && !showNewTicketForm && "hidden md:block"
                            )}>
                                {showNewTicketForm ? (
                                    <Card className="h-full">
                                        <CardHeader>
                                            {/* Mobile Back Button */}
                                            <div className="md:hidden mb-2">
                                                <Button variant="ghost" size="sm" onClick={() => setShowNewTicketForm(false)} className="-ml-2 gap-1">
                                                    ← Back to tickets
                                                </Button>
                                            </div>
                                            <CardTitle>Create New Support Ticket</CardTitle>
                                            <CardDescription>Describe your issue and we'll respond within 48 hours</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleCreateTicket} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="subject">Subject *</Label>
                                                    <Input
                                                        id="subject"
                                                        name="subject"
                                                        placeholder="Brief summary of your issue"
                                                        maxLength={100}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="description">Description * (Max 500 characters)</Label>
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                                        placeholder="Describe your issue in detail..."
                                                        maxLength={500}
                                                        required
                                                        onChange={(e) => {
                                                            const counter = document.getElementById('char-counter');
                                                            if (counter) {
                                                                counter.textContent = `${e.target.value.length}/500`;
                                                            }
                                                        }}
                                                    />
                                                    <p id="char-counter" className="text-xs text-muted-foreground text-right">0/500</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setShowNewTicketForm(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" disabled={sendingMsg} className="gap-2">
                                                        {sendingMsg && <Loader2 className="w-4 h-4 animate-spin" />}
                                                        Submit Ticket
                                                    </Button>
                                                </div>
                                            </form>
                                        </CardContent>
                                    </Card>
                                ) : selectedConversation ? (
                                    <Card className="h-full flex flex-col">
                                        <CardHeader className="border-b">
                                            {/* Mobile Back Button */}
                                            <div className="md:hidden mb-2">
                                                <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)} className="-ml-2 gap-1">
                                                    ← Back to tickets
                                                </Button>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle className="text-lg">{selectedConvo?.subject}</CardTitle>
                                                    <CardDescription className="mt-1">
                                                        {selectedConvo?.status === 'OPEN' ? '💬 Active conversation' : '✓ Closed'}
                                                    </CardDescription>
                                                </div>
                                                <Badge variant={selectedConvo?.status === 'OPEN' ? 'default' : 'secondary'}>
                                                    {selectedConvo?.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={cn(
                                                        "max-w-[80%] rounded-lg p-3",
                                                        msg.sender === 'USER'
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted'
                                                    )}>
                                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                                        <span className="text-[10px] opacity-70 block mt-1">
                                                            {format(new Date(msg.createdAt), "PPp")}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                        {selectedConvo?.status === 'OPEN' && (
                                            <div className="p-4 border-t">
                                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                                    <Input
                                                        value={newMessage}
                                                        onChange={(e) => setNewMessage(e.target.value)}
                                                        placeholder="Type your message..."
                                                        disabled={sendingMsg}
                                                        className="flex-1"
                                                    />
                                                    <Button type="submit" disabled={sendingMsg || !newMessage.trim()}>
                                                        {sendingMsg ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                                    </Button>
                                                </form>
                                            </div>
                                        )}
                                        {selectedConvo?.status === 'CLOSED' && (
                                            <div className="p-4 border-t bg-muted/50">
                                                <div className="flex items-center justify-center gap-2 text-sm text-center text-muted-foreground">
                                                    <XCircle className="w-4 h-4" />
                                                    <p>
                                                        This ticket has been closed by support. Please create a new ticket for additional assistance.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                ) : (
                                    <Card className="h-full flex items-center justify-center">
                                        <div className="text-center p-6">
                                            <MessageSquare className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium mb-2">Select a Conversation</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Choose a ticket from the list or create a new one
                                            </p>
                                            <Button onClick={() => setShowNewTicketForm(true)} className="gap-2">
                                                <Plus className="w-4 h-4" />
                                                Create New Ticket
                                            </Button>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                                <CardDescription>Manage your profile information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Account Email</Label>
                                    <Input value={user?.email} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input defaultValue={user?.name} placeholder="Your name" />
                                </div>
                                <Separator />
                                <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        Contact support to update your email or password.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </main>
            </div>

            {/* Modify Request Dialog */}
            <Dialog open={!!modifyBooking} onOpenChange={(open) => !open && setModifyBooking(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request Modification</DialogTitle>
                        <DialogDescription>
                            Tell us what you'd like to change about your booking for {modifyBooking?.activityTitle}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>What would you like to modify?</Label>
                            <textarea
                                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="E.g., change date, number of guests, special requests..."
                                value={modifyRequest}
                                onChange={(e) => setModifyRequest(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setModifyBooking(null)}>Cancel</Button>
                        <Button onClick={handleSubmitModifyRequest} disabled={submittingModify || !modifyRequest.trim()}>
                            {submittingModify ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Request'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Review Dialog */}
            <Dialog open={!!reviewBooking} onOpenChange={(open) => !open && setReviewBooking(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rate Your Experience</DialogTitle>
                        <DialogDescription>
                            How was your {reviewBooking?.activityTitle}?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                </button>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Label>Comment</Label>
                            <textarea
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Share your experience..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setReviewBooking(null)}>Cancel</Button>
                        <Button onClick={handleSubmitReview} disabled={submittingReview}>
                            {submittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Review'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
