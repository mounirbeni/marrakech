
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Edit, Plus, Trash } from "lucide-react";

async function getServices() {
    return await prisma.service.findMany({
        orderBy: { title: 'asc' }
    });
}

export default async function AdminExperiencesPage() {
    const services = await getServices();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Experiences</h1>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Experience
                </Button>
            </div>

            <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No services found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium">{service.title}</TableCell>
                                    <TableCell className="capitalize">{service.category}</TableCell>
                                    <TableCell>€{service.price}</TableCell>
                                    <TableCell>{service.duration}</TableCell>
                                    <TableCell>{service.rating} ({service.reviewCount})</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
