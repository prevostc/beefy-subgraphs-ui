import { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import Decimal from "decimal.js";

export default function Metric({
  description,
  value,
  mode,
}: {
  description: string;
  value: string | number;
  mode: "usd" | "percent" | "count";
}) {
  const d = useMemo(() => new Decimal(value), [value]);
  const formattedValue = useMemo(() => {
    if (mode === "usd") {
      return `$${d.toNumber().toLocaleString()}`;
    }
    if (mode === "percent") {
      return `${d.toFixed(2)}%`;
    }
    return d.toNumber().toLocaleString();
  }, [d, mode]);
  const rawValue = useMemo(() => d.toNumber(), [d]);
  return (
    <Card className="min-w-unit-52">
      <CardHeader>{description}</CardHeader>
      <Divider />
      <CardBody className="text-right">
        <div>
          <Tooltip
            delay={0}
            closeDelay={0}
            content={<div className="p-3">{rawValue}</div>}
          >
            <span className="text-3xl text-400 cursor-pointer">
              {formattedValue}
            </span>
          </Tooltip>
        </div>
      </CardBody>
      <Divider />
    </Card>
  );
}
