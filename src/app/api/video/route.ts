import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const video = await prisma.video.findMany(
            {
                orderBy: {createdAt: "desc"}
            }
        )
        return NextResponse.json(video)
    } catch (e) {
        return NextResponse.json({error: e})

    } finally {
        await prisma.$disconnect()
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { title, publicId, originalSize, compressedSize, duration, description } = body;
        if (!title || !publicId || !originalSize || !compressedSize || !duration) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const video = await prisma.video.create({
            data: {
                title,
                description: description || null, // Optional field
                publicId,
                originalSize,
                compressedSize,
                duration,
            },
        });

        return NextResponse.json(video, { status: 201 });
    } catch (e) {
        console.error("Error creating video:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}