import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
	const formData = await request.formData();
	console.log(formData);
	const file = formData.get("file");
	const userId = formData.get("userId");
	const description = formData.get("description");
	if (!file) {
		return NextResponse.json(
			{ error: "File blob is required." },
			{ status: 400 }
		);
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const relativeUploadDir = `/posts/${dateFn.format(Date.now(), "dd-MM-Y")}`;
	const uploadDir = join(process.cwd(), "public", relativeUploadDir);

	try {
		await stat(uploadDir);
	} catch (e) {
		if (e.code === "ENOENT") {
			await mkdir(uploadDir, { recursive: true });
		} else {
			console.error(
				"Error while trying to create directory when uploading a file\n",
				e
			);
			return NextResponse.json(
				{ error: "Something went wrong." },
				{ status: 500 }
			);
		}
	}

	try {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;
		await writeFile(`${uploadDir}/${filename}`, buffer);

		await prisma.post.create({
			data: {
				content: `${relativeUploadDir}/${filename}`,
				description: description, // TODO - get description from request body
				userId: parseInt(userId), // TODO - get user id from request body
			},
		});
		return NextResponse.json({ status: true });
	} catch (e) {
		console.error("Error while trying to upload a file\n", e);
		return NextResponse.json(
			{ error: "Something went wrong." },
			{ status: 500 }
		);
	}
}
