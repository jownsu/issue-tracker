"use client";

/* CLIENT */
import { Issue, User } from "@prisma/client";

/* COMPONENTS */
import { Skeleton } from "@/app/components";

/* PLUGINS */
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const {
		data: users,
		isLoading,
		error
	} = useQuery({
		queryKey: ["users"],
		queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
		staleTime: 60 * 1000,
		retry: 3
	});

	if (error) return null;

	if (isLoading) return <Skeleton />;

	return (
		<Select.Root
			defaultValue={issue.userId || " "}
			onValueChange={(userId) => {
				axios.put(`/api/issues/${issue.id}`, { userId: userId.trim() || null });
			}}
		>
			<Select.Trigger placeholder="Assign..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					<Select.Item value={" "}>Unassigned</Select.Item>
					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;
