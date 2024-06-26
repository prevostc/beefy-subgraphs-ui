import {
  ProtocolDashboardDocument,
  ProtocolDashboardQuery,
  getBuiltGraphSDK,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { Section } from "../Section";
import { PageBody } from "../PageBody";
import { StackedLineTimeseries } from "../StackedLineTimeseries";
import { allChains } from "../../utils/chains";
import { useQuery } from "@tanstack/react-query";
import { ChainMetric } from "../ChainMetric";
import { PERIODS } from "../../utils/periods";
import { useState } from "react";

const sdk = getBuiltGraphSDK();

const createFetchData = (period: number) => async () => {
  const results = await Promise.all(
    allChains.map((chain) =>
      sdk
        .ProtocolDashboard({ period }, { chainName: chain })
        .then((data) => ({ ...data, chain }))
    )
  );
  return results;
};

export function ProtocolMetrics() {
  const [period, setPeriod] = useState(PERIODS[1].key);
  const { isPending, error, data } = useQuery({
    queryKey: ["protocolDashboard", { period }],
    queryFn: createFetchData(period),
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
          description="Active Investor Count"
          values={data}
          get={(v) => v.protocol?.activeInvestorCount}
          mode="count"
        />
        <ChainMetric
          description="Cumulative Harvest Count"
          values={data}
          get={(v) => v.protocol?.cumulativeHarvestCount}
          mode="count"
        />
      </Section.Metrics>

      <Section.Title>Snapshots</Section.Title>
      <Section.Body>
        <StackedLineTimeseries<ProtocolDashboardQuery["snapshots"][0]>
          period={period}
          onPeriodChange={setPeriod}
          dataSets={data.map((d) => ({
            name: d.chain,
            values: d.snapshots,
          }))}
          config={[
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
          ]}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={ProtocolDashboardDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}
