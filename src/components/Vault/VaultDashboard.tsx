import { useQuery } from "@tanstack/react-query";
import {
  VaultDashboardDocument,
  VaultSnapshotFragment,
  getBuiltGraphSDK,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { Section } from "../Section";
import { PageBody } from "../PageBody";
import { VaultMetrics } from "./VaultMetrics";
import { VaultPriceRangeTsChart } from "./VaultPriceRangeTsChart";
import { VaultHarvestTable } from "./VaultHarvestList";
import { StackedLineTimeseries } from "../StackedLineTimeseries";
import { VaultCollectTable } from "./VaultCollectList";
import { InvestorPositionsTable } from "../Investor/Position/InvestorPositionsTable";
import { InvestorPositionInteractionTable } from "../Investor/Position/InvestorPositionInteractionTable";

const sdk = getBuiltGraphSDK();
const createFetchData = (chain: string, address: string) => async () => {
  const data = await sdk.VaultDashboard({ address }, { chainName: chain });
  return { ...data, chain };
};
export function VaultDashboard({
  chain,
  address,
}: {
  chain: string;
  address: string;
}) {
  const { isPending, error, data } = useQuery({
    queryKey: ["vaultDashboard"],
    queryFn: createFetchData(chain, address),
  });

  if (isPending) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  if (!data || !data.vault) {
    return <pre>No data</pre>;
  }

  return (
    <PageBody>
      <Section.Title>Price Range</Section.Title>
      <Section.Body>
        <VaultPriceRangeTsChart ranges={data.vault.dailyPriceRanges} />
      </Section.Body>

      <Section.Title>Harvests</Section.Title>
      <Section.Body>
        <VaultHarvestTable data={data.vault.harvests} />
      </Section.Body>

      <Section.Title>Collects</Section.Title>
      <Section.Body>
        <VaultCollectTable data={data.vault.collectedFees} />
      </Section.Body>

      <Section.Title>Positions</Section.Title>
      <Section.Body>
        <InvestorPositionsTable
          data={data.vault.positions.map((i) => ({ chain, ...i }))}
        />
      </Section.Body>

      <Section.Title>Interactions</Section.Title>
      <Section.Body>
        <InvestorPositionInteractionTable data={data.vault.interactions} />
      </Section.Body>

      <Section.Title>Timeseries</Section.Title>
      <Section.Body>
        <StackedLineTimeseries<VaultSnapshotFragment>
          dataSets={[
            {
              name: "Vault",
              values: data.vault.dailySnapshots,
            },
          ]}
          config={[
            { key: "currentPriceOfToken0InToken1", format: "float" },
            { key: "currentPriceOfToken0InUSD", format: "usd" },
            { key: "priceRangeMin1", format: "float" },
            { key: "priceRangeMax1", format: "float" },
            { key: "priceRangeMinUSD", format: "usd" },
            { key: "priceRangeMaxUSD", format: "usd" },
            { key: "underlyingAmount0", format: "float" },
            { key: "underlyingAmount1", format: "float" },
            { key: "underlyingAmount0USD", format: "usd" },
            { key: "underlyingAmount1USD", format: "usd" },
            { key: "totalValueLockedUSD", format: "usd" },
            { key: "harvestCount", format: "count" },
            { key: "depositCount", format: "count" },
            { key: "withdrawCount", format: "count" },
            { key: "transferCount", format: "count" },
            { key: "compoundedAmount0", format: "float" },
            { key: "compoundedAmount1", format: "float" },
            { key: "compoundedAmount0USD", format: "usd" },
            { key: "compoundedAmount1USD", format: "usd" },
            { key: "compoundedValueUSD", format: "usd" },
            { key: "harvesterFeeCollectedNative", format: "float" },
            { key: "protocolFeeCollectedNative", format: "float" },
            { key: "strategistFeeCollectedNative", format: "float" },
            { key: "harvesterFeeCollectedUSD", format: "usd" },
            { key: "protocolFeeCollectedUSD", format: "usd" },
            { key: "strategistFeeCollectedUSD", format: "usd" },
            { key: "apr1D", format: "percent" },
            { key: "apr7D", format: "percent" },
            { key: "apr30D", format: "percent" },
          ]}
        />
      </Section.Body>

      <VaultMetrics vault={data.vault} />

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={VaultDashboardDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}
