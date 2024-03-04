/* NEXT */
import NextLink from "next/link";

/* PLUGINS */
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
	href: string;
	children: string;
}

const Link = ({ href, children }: Props) => {
	return (
		<NextLink href={href} passHref legacyBehavior>
			<RadixLink>{children}</RadixLink>
		</NextLink>
	);
};

export default Link;
