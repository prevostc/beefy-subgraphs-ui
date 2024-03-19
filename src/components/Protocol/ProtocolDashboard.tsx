import {
  ProtocolDashboardDocument,
  ProtocolDashboardQuery,
  getBuiltGraphSDK,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { Section } from "../Section";
import { PageBody } from "../PageBody";
import {
  SnapshotTimeseries,
  SnapshotTimeseriesConfig,
} from "../SnapshotTimeseries";
import { allChains } from "../../utils/chains";
import { useQuery } from "@tanstack/react-query";
import { ChainMetric } from "../ChainMetric";

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

const sdk = getBuiltGraphSDK();
const fetchData = async () => {
  const results = await Promise.all(
    allChains.map((chain) =>
      sdk
        .ProtocolDashboard(
          {},
          {
            chainName: chain,
          }
        )
        .then((data) => ({ ...data, chain }))
    )
  );

  return results;
};

export function ProtocolMetrics() {
  const { isPending, error, data } = useQuery({
    queryKey: ["protocolDashboard"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <PageBody>
      <Section.Title>Protocol</Section.Title>
      <Section.Metrics>
        <ChainMetric
          description="Beefy CLM TVL"
          values={data}
          get={(v) => v.protocol?.totalValueLockedUSD}
          mode="usd"
        />
        <ChainMetric
          description="Active Vaults"
          values={data}
          get={(v) => v.protocol?.activeVaultCount}
          mode="count"
        />
        <ChainMetric
          description="Cumulative Trx Count"
          values={data}
          get={(v) => v.protocol?.cumulativeTransactionCount}
          mode="count"
        />
        <ChainMetric
          description="Cumulative Investor Interactions Count"
          values={data}
          get={(v) => v.protocol?.cumulativeInvestorInteractionsCount}
          mode="count"
        />
        <ChainMetric
          description="Cumulative Harvest Count"
          values={data}
          get={(v) => v.protocol?.cumulativeHarvestCount}
          mode="count"
        />
      </Section.Metrics>

      <Section.Title>Timeseries</Section.Title>
      <Section.Body>
        <SnapshotTimeseries
          dataSets={data.map((d) => ({
            name: d.chain,
            snapshots: d.dailySnapshots,
          }))}
          config={protocolTimeseriesConfigs}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={ProtocolDashboardDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}
