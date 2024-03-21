import { createLazyFileRoute } from "@tanstack/react-router";
import { VaultDashboard } from "../components/Vault/VaultDashboard";

export const Route = createLazyFileRoute("/vault/$chain/$address")({
  component: VaultPage,
});

function VaultPage() {
  const { address, chain } = Route.useParams();
  return <VaultDashboard chain={chain} address={address} />;
}
