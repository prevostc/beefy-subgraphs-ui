import { createLazyFileRoute } from "@tanstack/react-router";
import { InvestorsList } from "../components/Investor/InvestorList";

export const Route = createLazyFileRoute("/investors")({
  component: InvestorsList,
});
