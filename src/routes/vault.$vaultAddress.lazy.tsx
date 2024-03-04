import { createLazyFileRoute } from "@tanstack/react-router";
import { VaultMetrics } from "../components/VaultMetrics/VaultMetrics";

export const Route = createLazyFileRoute("/vault/$vaultAddress")({
  component: VaultPage,
});

function VaultPage() {
  const { vaultAddress } = Route.useParams();
  console.log(vaultAddress);
  return <VaultMetrics vaultAddress={vaultAddress} />;
}
