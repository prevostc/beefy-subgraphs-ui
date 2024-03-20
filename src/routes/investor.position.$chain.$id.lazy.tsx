import { createLazyFileRoute } from "@tanstack/react-router";
import { InvestorPositionDashboard } from "../components/Investor/Position/InvestorPositionDashboard";

export const Route = createLazyFileRoute("/investor/position/$chain/$id")({
  component: Page,
});

function Page() {
  const { chain, id } = Route.useParams();
  return <InvestorPositionDashboard chain={chain} id={id} />;
}
