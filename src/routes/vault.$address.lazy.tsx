import { createLazyFileRoute } from "@tanstack/react-router";
import { VaultMetrics } from "../components/Vault/VaultMetrics";

export const Route = createLazyFileRoute("/vault/$address")({
  component: VaultPage,
});

function VaultPage() {
  const { address } = Route.useParams();
  return <VaultMetrics address={address} />;
}