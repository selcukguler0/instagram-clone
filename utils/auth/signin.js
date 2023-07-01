import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const isMail = (email) => {
	const regex = /\S+@\S+\.\S+/;
	return regex.test(email);
};

export async function SignIn(credentials) {
	const { username, email, password } = credentials;
	console.log(credentials);

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
					return {
						status: false,
						error: "Wrong password",
					};
				}
				return { status: true, user };
			}
			return {
				status: false,
				error: "User not found",
			};
		} catch (error) {
			return { status: false, error };
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
				return { status: false, error: "Wrong password" };
			}
			return { status: true, user };
		}
		return { status: false, error: "User not found" };
	} catch (error) {
		return { status: false, error };
	}
}
