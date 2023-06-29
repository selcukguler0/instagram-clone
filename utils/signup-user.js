import prisma from "./database";

export default async function signupUser(req, res) {
	const { username, password } = req.body;
	const user = await prisma.user.create({
		data: {
			username,
			password,
		},
	});
	res.json({ user });
}