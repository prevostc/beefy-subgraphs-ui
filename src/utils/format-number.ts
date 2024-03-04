import Decimal from "decimal.js";
import { ts2Date } from "./timestamp-to-date";

export type NumberFormatMode =
  | "usd"
  | "percent"
  | "count"
  | "eth"
  | "float"
  | "date"
  | "duration";

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
  if (mode === "date") {
    return ts2Date(d.toNumber() + "")
      .toISOString()
      .split("T")[0];
  }
  if (mode === "duration") {
    let ms = ts2Date(d.toNumber() + "").getTime();
    let days = Math.floor(ms / (1000 * 60 * 60 * 24));
    ms -= days * 1000 * 60 * 60 * 24;
    let hours = Math.floor(ms / (1000 * 60 * 60));
    ms -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(ms / (1000 * 60));
    ms -= minutes * 1000 * 60;
    let seconds = Math.floor(ms / 1000);
    let returnString = "";
    if (days > 0) {
      returnString += days + "d ";
    }
    if (hours > 0 || days > 0) {
      returnString += hours + "h ";
    }
    if (minutes > 0 || hours > 0 || days > 0) {
      returnString += minutes + "m ";
    }
    if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) {
      returnString += seconds + "s ";
    }
    return returnString.trim();
  }
  return d.toNumber().toLocaleString();
}
