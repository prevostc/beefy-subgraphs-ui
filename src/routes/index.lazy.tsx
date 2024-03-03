import { createLazyFileRoute } from "@tanstack/react-router";
import { ProtocolMetrics } from "../components/ProtocolMetrics/ProtocolMetrics";

export const Route = createLazyFileRoute("/")({
  component: ProtocolMetrics,
});
