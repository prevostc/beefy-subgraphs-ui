import React, { useCallback } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LinkProps as RouterLinkProps } from "@tanstack/react-router";
import "./index.css";
import { createClient, Provider } from "urql";
import { graphExchange } from "@graphprotocol/client-urql";
import * as GraphClient from "../.graphclient";

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const client = createClient({
  url: "https://api.0xgraph.xyz/subgraphs/name/beefyfinance/beefy-cl",
  exchanges: [graphExchange(GraphClient)],
});

function App() {
  const pushRoute = useCallback(
    (to: RouterLinkProps["to"]) => router.navigate({ to }),
    []
  );

  return (
    <Provider value={client}>
      <NextUIProvider navigate={pushRoute as (path: string) => void}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <RouterProvider router={router} />
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
