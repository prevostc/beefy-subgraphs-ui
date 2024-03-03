export function ts2Date(timestamp: string) {
  return new Date(parseInt(timestamp, 10) * 1000);
}
