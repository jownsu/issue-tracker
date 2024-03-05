import { issueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/schema";
import { getServerSession } from "next-auth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await getServerSession();
	if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 404 });

	const body = await request.json();

	const validation = issueSchema.safeParse(body);

	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	const updatedIssue = await prisma.issue.update({
		where: { id: +params.id },
		data: {
			title: body.title,
			description: body.description
		}
	});

	return NextResponse.json(updatedIssue);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const session = await getServerSession();
	if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 404 });

	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

	if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });

	await prisma.issue.delete({ where: { id: issue.id } });

	return NextResponse.json({ message: "Deleted" });
}
