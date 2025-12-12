import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// Close conversation (block user from messaging)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { userId } = await params;
        const { action } = await request.json();

        if (action === 'close') {
            await (prisma as any).user.update({
                where: { id: userId },
                data: { conversationStatus: 'CLOSED' }
            });
            return NextResponse.json({ message: 'Conversation closed' });
        } else if (action === 'reopen') {
            await (prisma as any).user.update({
                where: { id: userId },
                data: { conversationStatus: 'OPEN' }
            });
            return NextResponse.json({ message: 'Conversation reopened' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error updating conversation:', error);
        return NextResponse.json({
            error: 'Failed to update conversation',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// Delete conversation (delete all messages)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { userId } = await params;

        await (prisma as any).message.deleteMany({
            where: { userId }
        });

        return NextResponse.json({ message: 'Conversation deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete conversation' }, { status: 500 });
    }
}
