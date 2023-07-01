import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
	const url = new URL(req.url);
	const userId = url.searchParams.get("userId");
	console.log(userId);

	try {
		const posts = await prisma.post.findMany({
			take: 10,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				likes: {
					where: {
						userId: parseInt(userId),
					},
					select: {
						id: true,
					},
				},
				_count: {
					select: {
						likes: true,
					},
				},
			},
		});

		//add liked field to each post
		const formattedPosts = posts.map((post) => ({
			...post,
			liked: post.likes.length > 0,
		}));

		return NextResponse.json({ status: true, posts: formattedPosts });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ status: false, error }, { status: 500 });
	}

	// try {
	// 	const posts = await prisma.post.findMany({
	// 		take: 10,
	// 	});
	// 	return NextResponse.json(posts, { status: 200 });
	// } catch (error) {
	// 	return NextResponse.json({ status: false, error }, { status: 500 });
	// }
}
