import { Tooltip } from "@nextui-org/react";

export function HexDisplay({ hexString }: { hexString: string }) {
  return (
    <Tooltip
      delay={0}
      closeDelay={0}
      content={<div className="p-3">{hexString}</div>}
    >
      <p>{hexString.slice(0, 20)}...</p>
    </Tooltip>
  );
}
