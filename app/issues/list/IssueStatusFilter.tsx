"use client";

/* PLUGINS */
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
	{ label: "All", value: undefined },
	{ label: "Open", value: "OPEN" },
	{ label: "In Progress", value: "IN_PROGRESS" },
	{ label: "Closed", value: "CLOSED" }
];

const IssueStatusFilter = () => {
	const router = useRouter();
	const params = useSearchParams();

	const selectedStatus = statuses.find(
		(status) => status.value === params.get("status")
	);

	return (
		<Select.Root
			onValueChange={(status) => {
				router.push(`/issues/list${status.trim() ? `?status=${status}` : ""}`);
			}}
			defaultValue={selectedStatus?.value || ""}
		>
			<Select.Trigger placeholder="Filter by status..." />
			<Select.Content>
				{statuses.map((status, key) => (
					<Select.Item key={key} value={status.value || " "}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueStatusFilter;
