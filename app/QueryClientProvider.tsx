"use client";

/* REACT */
import React, { PropsWithChildren } from "react";

/* PLUGINS */
import { QueryClient, QueryClientProvider as Provider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
	return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
