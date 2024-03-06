"use client";

/* CLIENT */
import { User } from "@prisma/client";

/* COMPONENTS */
import { Skeleton } from "@/app/components";

/* PLUGINS */
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = () => {
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
		<Select.Root>
			<Select.Trigger placeholder="Assign..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
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
