import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { VaultAddressesFragment } from "../../.graphclient";
import { VaultAddressesDataTable } from "./VaultAddressesDataTable";

export function VaultAddressesBlock({
  vaultAddresses,
  description,
}: {
  vaultAddresses: VaultAddressesFragment;
  description: string;
}) {
  return (
    <Card className="min-w-unit-52">
      <CardHeader>{description}</CardHeader>
      <Divider />
      <CardBody className="text-right">
        <VaultAddressesDataTable vaultAddresses={vaultAddresses} />
      </CardBody>
      <Divider />
    </Card>
  );
}
