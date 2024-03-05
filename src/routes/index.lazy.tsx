import { createLazyFileRoute } from "@tanstack/react-router";
import { ProtocolMetrics } from "../components/Protocol/ProtocolDashboard";

export const Route = createLazyFileRoute("/")({
  component: ProtocolMetrics,
});
