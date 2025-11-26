import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");

        const where = status && status !== "ALL" ? { status } : {};

        const supportRequests = await prisma.supportRequest.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(supportRequests, { status: 200 });
    } catch (error) {
        console.error("Support Requests API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
