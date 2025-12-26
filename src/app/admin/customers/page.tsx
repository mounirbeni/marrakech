'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { format } from 'date-fns'
import { Search, Mail, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from '@/types/admin'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    const text = await res.text()
    try {
        return JSON.parse(text)
    } catch (e) {
        console.error(`JSON Parse Error for ${url}:`, text)
        throw e
    }
}

export default function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const { data: users, error, isLoading } = useSWR<User[]>('/api/admin/customers', fetcher)

    const filteredUsers = users?.filter((user) => {
        const query = searchQuery.toLowerCase()
        return (
            user.name?.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        )
    })

    const handleSuspend = async (userId: string, currentStatus: boolean) => {
        if (!confirm("Are you sure you want to suspend this user?")) return;
        try {
            const res = await fetch(`/api/admin/customers/${userId}/suspend`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ suspended: true }),
            });
            if (res.ok) {
                // native mutate would be better but window reload is safer for 'Start from Zero' reliability
                window.location.reload();
            } else {
                alert("Failed to suspend user");
            }
        } catch (error) {
            alert("Error canceling booking");
        }
    };

    if (error) return <div>Failed to load customers</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            {/* ... header ... */}
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                    <p className="text-muted-foreground">View and manage your registered customers.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Customers</CardTitle>
                    <CardDescription>A list of all registered users on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-6 max-w-sm">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search customers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Bookings</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers?.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                                                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{user.name || 'Unnamed User'}</div>
                                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.source === 'REGISTERED' ? 'default' : 'secondary'}>
                                                {user.source || 'REGISTERED'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(user.createdAt), 'PPP')}
                                        </TableCell>
                                        <TableCell>
                                            {user._count?.bookings || 0} bookings
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => window.location.href = `mailto:${user.email}`}>
                                                    <Mail className="h-4 w-4 mr-2" />
                                                    Message
                                                </Button>
                                                <Button variant="secondary" size="sm">
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleSuspend(user.id, false)}
                                                >
                                                    Suspend
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredUsers?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No customers found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
