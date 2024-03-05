"use client";

/* NEXT */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* PLUGINS */
import classNames from "classnames";
import { AiFillBug } from "react-icons/ai";
import { Box, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

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

	const { data, status } = useSession();
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
					<Box>
						{status === "authenticated" && (
							<Link href={"/api/auth/signout"}>Log out</Link>
						)}
						{status === "unauthenticated" && (
							<Link href={"/api/auth/signin"}>Log in</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
