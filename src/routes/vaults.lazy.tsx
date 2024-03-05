import { createLazyFileRoute } from "@tanstack/react-router";
import { VaultList } from "../components/Vault/VaultList";

export const Route = createLazyFileRoute("/vaults")({
  component: VaultList,
});
