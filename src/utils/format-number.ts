import Decimal from "decimal.js";

export type NumberFormatMode = "usd" | "percent" | "count" | "eth" | "float";

export function formatAs(
  value: string | number | Decimal,
  mode: NumberFormatMode
): string {
  const d = value instanceof Decimal ? value : new Decimal(value);
  if (mode === "usd") {
    return `$${d.toNumber().toLocaleString()}`;
  }
  if (mode === "percent") {
    return `${d.toFixed(2)}%`;
  }
  if (mode === "count") {
    return d.toNumber().toLocaleString();
  }
  if (mode === "eth") {
    return `${d.toFixed(4)} ETH`;
  }
  if (mode === "float") {
    return d.toFixed(2);
  }
  return d.toNumber().toLocaleString();
}
