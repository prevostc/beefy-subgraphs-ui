import { createRootRoute, Outlet } from "@tanstack/react-router";
import { PageLayout } from "../components/PageLayout";

export const Route = createRootRoute({
  component: () => (
    <PageLayout>
      <Outlet />
    </PageLayout>
  ),
});
