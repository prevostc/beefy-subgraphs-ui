import { createLazyFileRoute } from "@tanstack/react-router";
import { InvestorPositions } from "../components/InvestorPositions/InvestorPositions";

export const Route = createLazyFileRoute("/investor/$address")({
  component: Page,
});

function Page() {
  const { address } = Route.useParams();
  return <InvestorPositions address={address} />;
}
