"use client";

/* NEXT */
import { useRouter } from "next/navigation";

/* PLUGINS */
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

/* STYLES */
import "easymde/dist/easymde.min.css";

interface NewIssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const { register, control, handleSubmit } = useForm<NewIssueForm>();
	const router = useRouter();

	const handleNewIssueSubmit = handleSubmit(async (data) => {
		await axios.post("/api/issues", data);
		router.push("/issues");
	});

	return (
		<form className="max-w-xl space-y-3" onSubmit={handleNewIssueSubmit}>
			<TextField.Root>
				<TextField.Input placeholder="Title" {...register("title")} />
			</TextField.Root>
			<Controller
				name="description"
				control={control}
				render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
			/>
			<Button>Submit New Issue</Button>
		</form>
	);
};

export default NewIssuePage;
