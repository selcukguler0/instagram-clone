import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
	try {
		const posts = await prisma.post.findMany({
			take: 10,
		});
		return NextResponse.json(posts, { status: 200 });
	} catch (error) {
		return NextResponse.json({ status: false, error }, { status: 500 });
	}
}
