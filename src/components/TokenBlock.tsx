import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { TokenDataTable } from "./TokenDataTable";
import { TokenFragment } from "../../.graphclient";

export function TokenBlock({
  token,
  description,
}: {
  token: TokenFragment;
  description: string;
}) {
  return (
    <Card className="min-w-unit-52">
      <CardHeader>{description}</CardHeader>
      <Divider />
      <CardBody className="text-right">
        <TokenDataTable token={token} />
      </CardBody>
      <Divider />
    </Card>
  );
}
