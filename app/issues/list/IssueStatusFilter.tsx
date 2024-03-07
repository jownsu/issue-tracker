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
	const searchParams = useSearchParams();

	const selectedStatus = statuses.find(
		(status) => status.value === searchParams.get("status")
	);

	const handleValueChange = (status: string) => {
		const params = new URLSearchParams();
		const orderBy = searchParams.get("orderBy");

		if (status.trim()) params.append("status", status);
		if (orderBy) params.append("orderBy", orderBy);

		const query = params.size ? `?${params.toString()}` : "";

		router.push(`/issues/list${query}`);
	};

	return (
		<Select.Root
			onValueChange={handleValueChange}
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
