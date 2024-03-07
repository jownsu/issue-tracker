import { z } from "zod";

export const issueSchema = z.object({
	title: z.string().trim().min(1, "Title is required").max(255),
	description: z.string().trim().min(1, "Description is required")
});

export const updateIssueSchema = z.object({
	title: z.string().trim().min(1, "Title is required").max(255).optional(),
	description: z
		.string()
		.trim()
		.min(1, "Description is required")
		.max(65535)
		.optional(),
	userId: z.string().min(1, "userId is required").max(255).optional().nullable()
});
