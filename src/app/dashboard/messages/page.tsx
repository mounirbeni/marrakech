"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Message {
    id: string;
    content: string;
    sender: string;
    userId: string;
    conversationId: string;
    createdAt: string;
    read: boolean;
}

interface Conversation {
    id: string;
    subject: string;
    status: string;
    messages: Message[];
}

export default function MessagesPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchConversations = async () => {
        try {
            const res = await fetch('/api/conversations');
            if (res.ok) {
                const data = await res.json();
                setConversations(data);
                if (data.length > 0 && !activeConversationId) {
                    setActiveConversationId(data[0].id);
                }
            }
        } catch (error) {
            console.error("Failed to load conversations", error);
            toast.error("Failed to load messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConversations();
        const interval = setInterval(fetchConversations, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [conversations, activeConversationId]);

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversationId) return;

        try {
            const res = await fetch(`/api/conversations/${activeConversationId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMessage })
            });

            if (res.ok) {
                setNewMessage("");
                fetchConversations();
            } else {
                toast.error("Failed to send message");
            }
        } catch (error) {
            toast.error("Error sending message");
        }
    };

    const createConversation = async () => {
        const subject = prompt("Enter a subject for your new support request:");
        if (!subject) return;

        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject })
            });

            if (res.ok) {
                fetchConversations();
            } else {
                toast.error("Failed to create conversation");
            }
        } catch (error) {
            toast.error("Error creating conversation");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading messages...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[calc(100vh-8rem)] grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            {/* Conversation List */}
            <Card className="md:col-span-1 h-full border-none shadow-sm flex flex-col bg-white overflow-hidden rounded-3xl">
                <CardHeader className="p-5 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-bold text-gray-900">Inbox</CardTitle>
                        <Button size="sm" onClick={createConversation} className="bg-[#FF5F00] hover:bg-[#E55500] text-white rounded-full font-bold text-xs h-8">
                            + New Message
                        </Button>
                    </div>
                </CardHeader>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50/30">
                    {conversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-center text-gray-400 p-8">
                            <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                            <p>No messages yet.</p>
                        </div>
                    ) : (
                        conversations.map(conv => (
                            <div
                                key={conv.id}
                                onClick={() => setActiveConversationId(conv.id)}
                                className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${activeConversationId === conv.id ? 'bg-white border-orange-200 shadow-sm ring-1 ring-orange-100' : 'bg-white border-transparent hover:bg-white hover:shadow-sm text-gray-600'}`}
                            >
                                <div className={`font-bold text-sm mb-1 ${activeConversationId === conv.id ? 'text-[#FF5F00]' : 'text-gray-900'}`}>{conv.subject}</div>
                                <div className="text-xs text-gray-400 flex justify-between items-center font-medium">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">{conv.status}</span>
                                    <span>{new Date(conv.messages[conv.messages.length - 1]?.createdAt || Date.now()).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>

            {/* Chat Area */}
            <Card className="md:col-span-2 h-full border-none shadow-sm flex flex-col bg-white overflow-hidden rounded-3xl">
                {activeConversation ? (
                    <>
                        <CardHeader className="p-5 border-b border-gray-100 bg-white z-10">
                            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                {activeConversation.subject}
                            </CardTitle>
                            <CardDescription className="text-xs font-medium bg-gray-100 w-fit px-2 py-0.5 rounded-md text-gray-500">
                                Ticket ID: {activeConversation.id}
                            </CardDescription>
                        </CardHeader>

                        {/* Messages Scroll Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                            {activeConversation.messages.map(msg => {
                                const isMe = msg.sender === 'CLIENT';
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${isMe ? 'bg-[#FF5F00] text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}`}>
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                            <span className={`text-[10px] block text-right mt-1.5 font-medium ${isMe ? 'text-orange-100' : 'text-gray-400'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-white">
                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-50 border-transparent focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-50 rounded-full h-11 px-5 transition-all"
                                />
                                <Button type="submit" size="icon" className="h-11 w-11 rounded-full bg-[#FF5F00] hover:bg-[#E55500] text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95">
                                    <Send className="h-5 w-5 ml-0.5" />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 bg-gray-50/30">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No conversation selected</h3>
                        <p className="text-gray-500">Select a ticket from the inbox to view details.</p>
                    </div>
                )}
            </Card>
        </motion.div>
    );
}
