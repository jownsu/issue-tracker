"use client";

/* NEXT */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* PLUGINS */
import classNames from "classnames";
import { AiFillBug } from "react-icons/ai";
import { Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
	const links = [
		{
			label: "Dashboard",
			href: "/"
		},
		{
			label: "Issues",
			href: "/issues/list"
		}
	];

	const pathname = usePathname();

	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex align={"center"} gap={"3"}>
					<Link href={"/"}>
						<AiFillBug />
					</Link>
					<ul className="flex space-x-6">
						{links.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className={classNames({
										"text-zinc-900": pathname === link.href,
										"text-zinc-500": pathname !== link.href,
										"hover:text-zinc-800 transition-colors": true
									})}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
