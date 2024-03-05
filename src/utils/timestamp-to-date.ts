export function ts2Date(timestamp: string | number) {
  if (typeof timestamp === "string") {
    timestamp = parseInt(timestamp, 10);
  }
  return new Date(timestamp * 1000);
}
