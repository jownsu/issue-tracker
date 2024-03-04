/* REACT */
import React, { PropsWithChildren } from "react";

/* PLUGINS */
import { Text } from "@radix-ui/themes";

const ErrorMeessage = ({ children }: PropsWithChildren) => {
	if (!children) return null;

	return (
		<Text as="p" color="red">
			{children}
		</Text>
	);
};

export default ErrorMeessage;
