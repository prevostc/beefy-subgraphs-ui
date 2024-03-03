import { createLazyFileRoute } from "@tanstack/react-router";
import { VaultList } from "../../components/VaultList/VaultList";

export const Route = createLazyFileRoute("/vault/")({
  component: VaultList,
});
