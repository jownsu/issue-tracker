/* PLUGINS */
import { Box } from "@radix-ui/themes";

/* COMPONENTS */
import { Skeleton } from "@/app/components";

const LoadingNewIssuePage = () => {
	return (
		<Box className="max-w-xl">
			<Skeleton />
			<Skeleton height="20rem" />
		</Box>
	);
};

export default LoadingNewIssuePage;
