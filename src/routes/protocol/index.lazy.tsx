import { createLazyFileRoute } from "@tanstack/react-router";
import { ProtocolStatsDocument } from "../../../.graphclient/index";
import { useQuery } from "urql";
import { Spinner } from "@nextui-org/react";

export const Route = createLazyFileRoute("/protocol/")({
  component: ProtocolPage,
});

function ProtocolPage() {
  const [result, _] = useQuery({
    query: ProtocolStatsDocument,
  });

  if (result.fetching) {
    return <Spinner size="lg" />;
  }
  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
