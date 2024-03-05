import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/schema";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
	const session = await getServerSession();
	if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 404 });

	const body = await request.json();

	const validation = await issueSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	const newIssue = await prisma.issue.create({
		data: {
			title: body.title,
			description: body.description
		}
	});

	return NextResponse.json(newIssue, { status: 201 });
}
