import { useQuery } from "urql";
import {
  ProtocolDashboardDocument,
  ProtocolDashboardQuery,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import Metric from "../NumericMetric";
import { QueryDebug } from "../QueryDebug";
import { Section } from "../Section";
import { PageBody } from "../PageBody";
import {
  SnapshotTimeseries,
  SnapshotTimeseriesConfig,
} from "../SnapshotTimeseries";

type SnapshotType = ProtocolDashboardQuery["dailySnapshots"][0];
const protocolTimeseriesConfigs: SnapshotTimeseriesConfig<SnapshotType>[] = [
  { key: "totalValueLockedUSD", format: "usd" },
  { key: "activeVaultCount", format: "count" },
  { key: "uniqueActiveInvestorCount", format: "count" },
  { key: "newInvestorCount", format: "count" },
  { key: "transactionCount", format: "count" },
  { key: "investorInteractionsCount", format: "count" },
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
];

export function ProtocolMetrics() {
  const [result, _] = useQuery({
    query: ProtocolDashboardDocument,
  });

  if (result.fetching || !result.data || !result.data.protocol) {
    return <Spinner size="lg" />;
  }
  const protocol = result.data.protocol;
  return (
    <PageBody>
      <Section.Title>Protocol</Section.Title>
      <Section.Metrics>
        <Metric
          description="Beefy ALM TVL"
          mode="usd"
          value={protocol.totalValueLockedUSD}
        />
        <Metric
          description="Active Vaults"
          mode="count"
          value={protocol.activeVaultCount}
        />
        <Metric
          description="Cumulative Trx Count"
          mode="count"
          value={protocol.cumulativeTransactionCount}
        />
        <Metric
          description="Cumulative Investor Interactions Count"
          mode="count"
          value={protocol.cumulativeInvestorInteractionsCount}
        />
        <Metric
          description="Cumulative Harvest Count"
          mode="count"
          value={protocol.cumulativeHarvestCount}
        />
      </Section.Metrics>

      <Section.Title>Timeseries</Section.Title>
      <Section.Body>
        <SnapshotTimeseries
          data={result.data.dailySnapshots}
          config={protocolTimeseriesConfigs}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={ProtocolDashboardDocument} result={result.data} />
      </Section.Body>
    </PageBody>
  );
}
