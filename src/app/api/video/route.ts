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