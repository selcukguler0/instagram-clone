import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
	const res = await req.json();
	const { username } = res;
	console.log(username);

	try {
		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
			select: {
				id: true,
				fullname: true,
				username: true,
				email: true,
				profilePic: true,
			},
		});
		console.log(user);

		return NextResponse.json({ status: true, user });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ status: false, error }, { status: 500 });
	}
}
