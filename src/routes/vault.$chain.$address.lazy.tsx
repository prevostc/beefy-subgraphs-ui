import { createLazyFileRoute } from "@tanstack/react-router";
import { VaultMetrics } from "../components/Vault/VaultMetrics";

export const Route = createLazyFileRoute("/vault/$chain/$address")({
  component: VaultPage,
});

function VaultPage() {
  const { address, chain } = Route.useParams();
  return <VaultMetrics chain={chain} address={address} />;
}
