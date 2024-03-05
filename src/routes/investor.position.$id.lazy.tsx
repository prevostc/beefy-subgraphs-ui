import { createLazyFileRoute } from "@tanstack/react-router";
import { InvestorPositionDashboard } from "../components/Investor/Position/InvestorPositionDashboard";

export const Route = createLazyFileRoute("/investor/position/$id")({
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return <InvestorPositionDashboard id={id} />;
}
