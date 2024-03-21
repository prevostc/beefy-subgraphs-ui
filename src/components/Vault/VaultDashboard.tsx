import { useQuery } from "@tanstack/react-query";
import { VaultStatsDocument, getBuiltGraphSDK } from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { Section } from "../Section";
import { PageBody } from "../PageBody";
import { VaultMetrics } from "./VaultMetrics";
import { VaultPriceRangeTsChart } from "./VaultPriceRangeTsChart";

const sdk = getBuiltGraphSDK();
const createFetchData = (chain: string, address: string) => async () => {
  const data = await sdk.VaultStats({ address }, { chainName: chain });
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

      <VaultMetrics vault={data.vault} />

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={VaultStatsDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}
