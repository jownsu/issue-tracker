"use client";

/* NEXT */
import { useRouter } from "next/navigation";
import { useState } from "react";

/* PLUGINS */
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

/* CLIENT */
import axios from "axios";

/* COMPONENTS */
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [isDeleting, setDeleting] = useState(false);

	const handleDeleteClick = async () => {
		try {
			setDeleting(true);
			await axios.delete(`/api/issues/${issueId}`);
			router.push("/issues/list");
			router.refresh();
		} catch (error) {
			setError(true);
			setDeleting(false);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red" disabled={isDeleting}>
						Delete Issue
						{isDeleting && <Spinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete this issue? This action cannot be
						undone?
					</AlertDialog.Description>
					<Flex mt={"4"} gap={"3"}>
						<AlertDialog.Cancel>
							<Button color="gray" variant="soft">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={handleDeleteClick}>
								Delete Issue
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						This issue could not be deleted.
					</AlertDialog.Description>
					<Button
						color="gray"
						variant="soft"
						mt="2"
						onClick={() => setError(false)}
					>
						OK
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;