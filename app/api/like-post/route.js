import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
	const res = await req.json();
	const { userId, postId } = res;
	console.log(userId);

	try {
		//postId and userId not unique fields in like table so we need to use findMany
		const isLiked = await prisma.like.findMany({
			where: {
				AND: [
					{
						postId: parseInt(postId),
					},
					{
						userId: parseInt(userId),
					},
				],
			},
		});
		console.log(isLiked);

		if (isLiked.length > 0) {
			await prisma.like.delete({
				where: {
					id: isLiked[0].id,
				},
			});
			return NextResponse.json({ status: true, liked: false });
		} else {
			await prisma.like.create({
				data: {
					postId: parseInt(postId),
					userId: parseInt(userId),
				},
			});
			return NextResponse.json({ status: true, liked: true });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ status: false, error }, { status: 500 });
	}
}
