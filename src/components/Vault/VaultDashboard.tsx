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
            { key: "harvestedAmount0", format: "float" },
            { key: "harvestedAmount1", format: "float" },
            { key: "harvestedAmount0USD", format: "usd" },
            { key: "harvestedAmount1USD", format: "usd" },
            { key: "harvestValueUSD", format: "usd" },
            { key: "harvesterFeeCollectedNative", format: "float" },
            { key: "protocolFeeCollectedNative", format: "float" },
            { key: "strategistFeeCollectedNative", format: "float" },
            { key: "harvesterFeeCollectedUSD", format: "usd" },
            { key: "protocolFeeCollectedUSD", format: "usd" },
            { key: "strategistFeeCollectedUSD", format: "usd" },
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
