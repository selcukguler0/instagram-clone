import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const isMail = (email) => {
	const regex = /\S+@\S+\.\S+/;
	return regex.test(email);
};

export async function POST(request) {
	const res = await request.json();
	const { username, password, email, fullName } = res;
	console.log(res);

	if (!fullName || !username || !email || !password) {
		return NextResponse.json(
			{ status: false, error: "All fields must be filled." },
			{ status: 400 }
		);
	}
	if (!isMail(email)) {
		return NextResponse.json(
			{ status: false, error: "Email is not valid." },
			{ status: 400 }
		);
	}

	try {
		const checkUsername = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});
		if (checkUsername) {
			return NextResponse.json(
				{
					status: false,
					error: "Username already exist",
				},
				{ status: 401 }
			);
		}
		const checkEmail = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (checkEmail) {
			return NextResponse.json(
				{
					status: false,
					error: "Email already exist",
				},
				{ status: 401 }
			);
		}
		await prisma.user.create({
			data: {
				fullname: fullName,
				username: username,
				email: email,
				password: password,
			},
		});
		return NextResponse.json({ status: true });
	} catch (error) {
		return NextResponse.json({ status: false, error: "Something went wrong!" }, { status: 500 });
	}
}
