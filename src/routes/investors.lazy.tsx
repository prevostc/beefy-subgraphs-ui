import { createLazyFileRoute } from "@tanstack/react-router";
import { InvestorsList } from "../components/InvestorList/InvestorList";

export const Route = createLazyFileRoute("/investors")({
  component: InvestorsList,
});
