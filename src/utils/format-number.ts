import Decimal from "decimal.js";
import { ts2Date } from "./timestamp-to-date";
import { format } from "echarts";

const locale = "en-US";
const durationFormatter = {
  format: (ms: number) => {
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
  },
};

const datetimeFormatter = {
  format: (ms: number) => {
    return new Date(ms).toISOString().slice(0, 10);
  },
};

const formatters = {
  usd: {
    default: new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "standard",
    }),
    extreme: new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "engineering",
    }),
  },
  percent: {
    default: new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 2,
      notation: "standard",
    }),
    extreme: new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 2,
      notation: "engineering",
    }),
  },
  count: {
    default: new Intl.NumberFormat(locale, {
      notation: "standard",
    }),
    extreme: new Intl.NumberFormat(locale, { notation: "engineering" }),
  },
  eth: {
    default: new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "ETH",
      notation: "standard",
    }),
    extreme: new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "ETH",
      notation: "engineering",
    }),
  },
  float: {
    default: new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
      notation: "standard",
    }),
    extreme: new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
      notation: "engineering",
    }),
  },
  date: {
    default: datetimeFormatter,
    extreme: datetimeFormatter,
  },
  duration: {
    default: durationFormatter,
    extreme: durationFormatter,
  },
};
export type NumberFormatMode = keyof typeof formatters;

export function formatAs(
  value: string | number | Decimal,
  mode: NumberFormatMode
): string {
  let d = (value instanceof Decimal ? value : new Decimal(value)).toNumber();
  if (isNaN(d)) {
    return "NaN";
  }
  if (mode === "duration" || mode === "date") {
    d = ts2Date(d).getTime();
  }

  if (mode === "date" && d === 0) {
    return "N/A";
  }

  const abs = Math.abs(d);
  if (abs > 1000000 || (abs < 0.01 && abs > 0)) {
    return engineeringUtf8Superscript(formatters[mode].extreme.format(d));
  }
  return formatters[mode].default.format(d);
}

function engineeringUtf8Superscript(str: string): string {
  const eIdx = str.indexOf("E");
  if (eIdx === -1) {
    return str;
  }
  const mantissa = str.slice(0, eIdx);
  const exponent = str.slice(eIdx + 1);
  return (
    mantissa +
    "e" +
    exponent
      .split("")
      .map((c) => {
        if (!(c in superscript_map)) {
          return c;
        }
        // @ts-ignore
        return superscript_map[c];
      })
      .join("")
  );
}

const superscript_map = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ᶦ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  q: "۹",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  A: "ᴬ",
  B: "ᴮ",
  C: "ᶜ",
  D: "ᴰ",
  E: "ᴱ",
  F: "ᶠ",
  G: "ᴳ",
  H: "ᴴ",
  I: "ᴵ",
  J: "ᴶ",
  K: "ᴷ",
  L: "ᴸ",
  M: "ᴹ",
  N: "ᴺ",
  O: "ᴼ",
  P: "ᴾ",
  Q: "Q",
  R: "ᴿ",
  S: "ˢ",
  T: "ᵀ",
  U: "ᵁ",
  V: "ⱽ",
  W: "ᵂ",
  X: "ˣ",
  Y: "ʸ",
  Z: "ᶻ",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};
