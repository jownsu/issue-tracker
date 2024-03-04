"use client";

/* NEXT */
import { useRouter } from "next/navigation";
import { useState } from "react";

/* PLUGINS */
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

/* SCHEMAS */
import { createIssueSchema } from "@/app/validationSchema";

/* STYLES */
import "easymde/dist/easymde.min.css";
import ErrorMeessage from "@/app/components/ErrorMeessage";

type NewIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<NewIssueForm>({
		defaultValues: {
			title: "",
			description: ""
		},
		resolver: zodResolver(createIssueSchema)
	});
	const router = useRouter();
	const [error, setError] = useState("");

	const handleNewIssueSubmit = handleSubmit(async (data) => {
		try {
			await axios.post("/api/issues", data);
			router.push("/issues");
		} catch (error) {
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
				<ErrorMeessage>{errors.title?.message}</ErrorMeessage>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				<ErrorMeessage>{errors.description?.message}</ErrorMeessage>
				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
