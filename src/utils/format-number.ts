import Decimal from "decimal.js";

export function formatAs(
  value: string | number | Decimal,
  mode: "usd" | "percent" | "count" | "eth"
): string {
  const d = value instanceof Decimal ? value : new Decimal(value);
  if (mode === "usd") {
    return `$${d.toNumber().toLocaleString()}`;
  }
  if (mode === "percent") {
    return `${d.toFixed(2)}%`;
  }
  return d.toNumber().toLocaleString();
}
