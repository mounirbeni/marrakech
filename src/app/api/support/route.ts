import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message, phone } = body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Save to database
        const supportRequest = await prisma.supportRequest.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject,
                message,
                status: "PENDING",
            },
        });

        console.log("Support Request Created:", supportRequest.id);

        return NextResponse.json(
            {
                success: true,
                message: "Support request received successfully",
                id: supportRequest.id
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Support API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
