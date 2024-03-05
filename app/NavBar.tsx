"use client";

/* NEXT */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* PLUGINS */
import classNames from "classnames";
import { AiFillBug } from "react-icons/ai";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
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

	const { data: session, status } = useSession();
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
					<Box ml={"auto"}>
						{status === "authenticated" && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										src={session.user?.image!}
										fallback="?"
										size="2"
										radius="full"
										className="cursor-pointer"
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text size={"2"}>{session.user?.email}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item>
										<Link href={"/api/auth/signout"}>Log out</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
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
