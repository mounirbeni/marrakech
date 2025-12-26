import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const conversationId = params.id;
        const { content } = await request.json();

        if (!content) {
            return NextResponse.json({ error: 'Content required' }, { status: 400 });
        }

        // Verify conversation ownership
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId }
        });

        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        if (session.role !== 'ADMIN' && conversation.userId !== session.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const message = await prisma.message.create({
            data: {
                content,
                conversationId,
                userId: session.id,
                sender: session.role // 'CLIENT' or 'ADMIN'
            }
        });

        // Update conversation timestamp
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error("Message Creation Error:", error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
