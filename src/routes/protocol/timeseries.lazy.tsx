import { createLazyFileRoute } from "@tanstack/react-router";
import { ProtocolTimeseries } from "../../components/ProtocolTimeseries/ProtocolTimeseries";

export const Route = createLazyFileRoute("/protocol/timeseries")({
  component: ProtocolTimeseries,
});
