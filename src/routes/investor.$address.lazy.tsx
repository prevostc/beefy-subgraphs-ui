import { createLazyFileRoute } from "@tanstack/react-router";
import { InvestorDashboard } from "../components/Investor/InvestorDashboard";

export const Route = createLazyFileRoute("/investor/$address")({
  component: Page,
});

function Page() {
  const { address } = Route.useParams();
  return <InvestorDashboard address={address} />;
}
