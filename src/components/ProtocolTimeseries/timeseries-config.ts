import { ProtocolSnapshotsQuery } from "../../../.graphclient";

type ValidMetric = keyof ProtocolSnapshotsQuery["dailySnapshots"][0];
export type ProtocolTimeseriesConfig = {
  key: ValidMetric;
  title: string;
  format: "usd" | "eth" | "count";
};

export const protocolTimeseriesConfigs: ProtocolTimeseriesConfig[] = (
  [
    { key: "totalValueLockedUSD", format: "usd" },
    { key: "activeVaultCount", format: "count" },
    { key: "activeInvestorCount", format: "count" },
    { key: "newInvestorCount", format: "count" },
    { key: "totalTransactionCount", format: "count" },
    { key: "investorTransactionsCount", format: "count" },
    { key: "harvesterTransactionsCount", format: "count" },
    { key: "totalGasSpent", format: "count" },
    { key: "totalGasSpentUSD", format: "usd" },
    { key: "investorGasSpent", format: "count" },
    { key: "investorGasSpentUSD", format: "usd" },
    { key: "harvesterGasSpent", format: "count" },
    { key: "harvesterGasSpentUSD", format: "usd" },
    { key: "protocolGasSaved", format: "count" },
    { key: "protocolGasSavedUSD", format: "usd" },
    { key: "protocolFeesCollectedNative", format: "eth" },
    { key: "protocolFeesCollectedUSD", format: "usd" },
    { key: "harvesterFeesCollectedNative", format: "eth" },
    { key: "harvesterFeesCollectedUSD", format: "usd" },
    { key: "strategistFeesCollectedNative", format: "eth" },
    { key: "strategistFeesCollectedUSD", format: "usd" },
    { key: "zapFeesCollectedNative", format: "eth" },
    { key: "zapFeesCollectedUSD", format: "usd" },
  ] as const
).map((c) => ({
  ...c,
  title: c.key
    .split(/(?=[A-Z])/)
    .join(" ")
    .replace("U S D", "USD")
    .replace(/^./, (str) => str.toUpperCase()),
}));
