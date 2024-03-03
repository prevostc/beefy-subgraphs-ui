import { createLazyFileRoute } from "@tanstack/react-router";
import { PageLayout } from "../components/PageLayout";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <h3>Welcome Home!</h3>;
}
