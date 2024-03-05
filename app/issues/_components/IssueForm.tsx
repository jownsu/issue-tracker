"use client";

/* NEXT */
import { useRouter } from "next/navigation";
import { useState } from "react";

/* PLUGINS */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";

/* SCHEMAS */
import { issueSchema } from "@/app/validationSchema";

/* COMPONENTS */
import { Spinner, ErrorMessage } from "@/app/components";

/* STYLES */
import "easymde/dist/easymde.min.css";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IssueFormData>({
		defaultValues: {
			title: issue?.title,
			description: issue?.description
		},
		resolver: zodResolver(issueSchema)
	});
	const router = useRouter();
	const [error, setError] = useState("");
	const [isSubmitting, setSubmitting] = useState(false);

	const handleNewIssueSubmit = handleSubmit(async (data) => {
		setSubmitting(true);
		try {
			if (issue) {
				await axios.put(`/api/issues/${issue.id}`, data);
			} else {
				await axios.post("/api/issues", data);
			}
			router.push("/issues");
			router.refresh();
		} catch (error) {
			setSubmitting(false);
			setError("Something went wrong");
		}
	});

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="space-y-3" onSubmit={handleNewIssueSubmit}>
				<TextField.Root>
					<TextField.Input placeholder="Title" {...register("title")} />
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					render={({ field: { onBlur, onChange, value } }) => {
						return (
							<SimpleMDE
								placeholder="Description"
								onBlur={onBlur}
								onChange={onChange}
								value={value}
							/>
						);
					}}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					{issue ? "Update Issue" : "Submit New Issue"}{" "}
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
