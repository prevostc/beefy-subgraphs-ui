import { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import Decimal from "decimal.js";
import { NumberFormatMode, formatAs } from "../utils/format-number";

export function ChainMetric<T extends { chain: string }>({
  description,
  values,
  get,
  mode,
}: {
  description: string;
  values: T[];
  get: (v: T) => number | undefined;
  mode: NumberFormatMode;
}) {
  const d = useMemo(() => {
    const d = values
      .map(get)
      .filter((v): v is NonNullable<typeof v> => v !== undefined)
      .map((d) => new Decimal(d)) as Decimal[];
    if (d.length === 0) {
      return 0;
    }
    return d.reduce((a, b) => a.add(b), new Decimal(0));
  }, [values, get]);
  const formattedValue = useMemo(() => formatAs(d, mode), [d, mode]);
  const rawValue = useMemo(() => d.toString(), [d]);
  return (
    <Card className="min-w-unit-52">
      <CardHeader>{description}</CardHeader>
      <Divider />
      <CardBody className="text-right">
        <div>
          <Tooltip
            delay={0}
            closeDelay={0}
            content={
              <table className="p-3">
                <tbody>
                  <tr>
                    <td className="pr-2 text-right text-default-500">
                      {description}
                    </td>
                    <td className="text-left">{rawValue}</td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className="pr-2 text-right text-default-500"
                    >
                      <Divider />
                    </td>
                  </tr>
                  {values.map((v) => (
                    <tr key={v.chain}>
                      <td className="pr-2 text-right text-default-500">
                        {v.chain}
                      </td>
                      <td className="text-left">{get(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
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
