import { Tooltip } from "@nextui-org/react";

export function HexDisplay({
  hexString,
  showChars = 20,
}: {
  hexString: string;
  showChars?: number;
}) {
  const half = showChars / 2;
  return (
    <Tooltip
      delay={0}
      closeDelay={0}
      content={<div className="p-3">{hexString}</div>}
    >
      <p>
        {hexString.slice(0, half)}...{hexString.slice(-half)}
      </p>
    </Tooltip>
  );
}
