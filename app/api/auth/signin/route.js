import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const isMail = (email) => {
	const regex = /\S+@\S+\.\S+/;
	return regex.test(email);
};

export async function POST(request, respond) {
	const res = await request.json();
	const { username, email, password } = res;

	if (!username && !email) {
		return NextResponse.json(
			{ status: false, error: "All fields must be filled!" },
			{ status: 400 }
		);
	}
	if (!password) {
		return NextResponse.json(
			{ status: false, error: "All fields must be filled!" },
			{ status: 400 }
		);
	}

	//if email used for login
	if (isMail(email)) {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: email,
				},
			});

			if (user) {
				if (user.password !== password) {
					return NextResponse.json(
						{
							status: false,
							error: "Wrong password",
						},
						{ status: 401 }
					);
				}
				return NextResponse.json({ status: true, user });
			}
			return NextResponse.json(
				{
					status: false,
					error: "User not found",
				},
				{ status: 401 }
			);
		} catch (error) {
			return NextResponse.json({ status: false, error }, { status: 500 });
		}
	}

	// if username used for login
	try {
		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});
		console.log(user);

		if (user) {
			if (user.password !== password) {
				return NextResponse.json(
					{ status: false, error: "Wrong password" },
					{ status: 401 }
				);
			}
			return NextResponse.json({ status: true, user });
		}
		return NextResponse.json(
			{ status: false, error: "User not found" },
			{ status: 401 }
		);
	} catch (error) {
		return NextResponse.json({ status: false, error }, { status: 500 });
	}
}
