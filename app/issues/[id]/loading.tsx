/* PLUGINS */
import { Card, Flex } from "@radix-ui/themes";

/* COMPONENTS */
import { Skeleton } from "@/app/components";

const IssueDetailsPageLoading = () => {
	return (
		<div className="max-w-xl">
			<Skeleton />
			<Flex gap={"3"} my={"2"}>
				<Skeleton width={"5rem"} />
				<Skeleton width={"8rem"} />
			</Flex>
			<Card className="prose" mt={"5"}>
				<Skeleton count={3} />
			</Card>
		</div>
	);
};

export default IssueDetailsPageLoading;
