import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { TransactionFragment } from "../../.graphclient";
import { TransactionDataTable } from "./TransactionDataTable";

export function TransactionBlock({
  transaction,
  description,
}: {
  transaction: TransactionFragment;
  description: string;
}) {
  return (
    <Card className="min-w-unit-52">
      <CardHeader>{description}</CardHeader>
      <Divider />
      <CardBody className="text-right">
        <TransactionDataTable transaction={transaction} />
      </CardBody>
      <Divider />
    </Card>
  );
}
