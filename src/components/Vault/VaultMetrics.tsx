import { useQuery } from "@tanstack/react-query";
import { VaultStatsDocument, getBuiltGraphSDK } from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { TokenBlock } from "../TokenBlock";
import { TransactionBlock } from "../TransactionBlock";
import { VaultAddressesBlock } from "../VaultAddressesBlock";
import { Metric } from "../Metric";
import { Section } from "../Section";
import { PageBody } from "../PageBody";

const sdk = getBuiltGraphSDK();
const createFetchData = (chain: string, address: string) => async () => {
  const data = await sdk.VaultStats(
    {
      address,
    },
    {
      chainName: chain,
    }
  );
  return { ...data, chain };
};
export function VaultMetrics({
  chain,
  address,
}: {
  chain: string;
  address: string;
}) {
  const { isPending, error, data } = useQuery({
    queryKey: ["vaultMetrics"],
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
      <Section.Title>Configuration</Section.Title>
      <Section.Metrics>
        <TransactionBlock
          transaction={data.vault.createdWith}
          description="Created with"
        />
        <TokenBlock token={data.vault.sharesToken} description="Shares" />
        <TokenBlock
          token={data.vault.underlyingToken0}
          description="Underlying token 0"
        />
        <TokenBlock
          token={data.vault.underlyingToken1}
          description="Underlying token 1"
        />
        <VaultAddressesBlock
          vaultAddresses={data.vault}
          description="Addresses"
        />
      </Section.Metrics>

      <Section.Title>Prices</Section.Title>
      <Section.Metrics>
        <Metric
          value={data.vault.currentPriceOfToken0InToken1}
          description="Current Pool Price (in token 1)"
          mode="float"
        />
        <Metric
          value={data.vault.priceRangeMin1}
          description="Price range min (in token 1)"
          mode="float"
        />
        <Metric
          value={data.vault.priceRangeMax1}
          description="Price range max (in token 1)"
          mode="float"
        />
        <Metric
          value={data.vault.priceRangeMin1USD}
          description="Price range min (in USD)"
          mode="usd"
        />
        <Metric
          value={data.vault.priceRangeMax1USD}
          description="Price range max (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Balances</Section.Title>
      <Section.Metrics>
        <Metric
          value={data.vault.underlyingAmount0}
          description="Underlying token balance 0"
          mode="count"
        />
        <Metric
          value={data.vault.underlyingAmount1}
          description="Underlying token balance 1"
          mode="count"
        />
        <Metric
          value={data.vault.underlyingAmount0USD}
          description="Underlying token balance 0 (in USD)"
          mode="usd"
        />
        <Metric
          value={data.vault.underlyingAmount1USD}
          description="Underlying token balance 1 (in USD)"
          mode="usd"
        />
        <Metric
          value={data.vault.totalValueLockedUSD}
          description="Total Value Locked (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Counts</Section.Title>
      <Section.Metrics>
        <Metric
          value={data.vault.cumulativeHarvestCount}
          description="Harvests"
          mode="count"
        />
        <Metric
          value={data.vault.cumulativeDepositCount}
          description="Deposits"
          mode="count"
        />
        <Metric
          value={data.vault.cumulativeWithdrawCount}
          description="Withdrawals"
          mode="count"
        />
        <Metric
          value={data.vault.cumulativeTransferCount}
          description="Transfers"
          mode="count"
        />
      </Section.Metrics>

      <Section.Title>Harvest</Section.Title>
      <Section.Metrics>
        <Metric
          value={data.vault.cumulativeHarvestedAmount0}
          description="Cumulative Harvested token 0"
          mode="count"
        />
        <Metric
          value={data.vault.cumulativeHarvestedAmount1}
          description="Cumulative Harvested token 1"
          mode="count"
        />
        <Metric
          value={data.vault.cumulativeHarvestedAmount0USD}
          description="Cumulative Harvested token 0 (in USD)"
          mode="usd"
        />
        <Metric
          value={data.vault.cumulativeHarvestedAmount1USD}
          description="Cumulative Harvested token 1 (in USD)"
          mode="usd"
        />
        <Metric
          value={data.vault.cumulativeHarvestValueUSD}
          description="Cumulative Harvested (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Fees</Section.Title>
      <Section.Metrics>
        <Metric
          value={data.vault.cumulativeHarvesterFeeCollectedNative}
          description="Cumulative Harvested Fee (in native)"
          mode="count"
        />
        <Metric
          value={data.vault.cumulativeHarvesterFeeCollectedUSD}
          description="Cumulative Harvested Fee (in USD)"
          mode="usd"
        />
        <Metric
          value={data.vault.cumulativeProtocolFeeCollectedNative}
          description="Cumulative Protocol Fee (in native)"
          mode="count"
        />
        <Metric
          value={data.vault.cumulativeProtocolFeeCollectedUSD}
          description="Cumulative Protocol Fee (in USD)"
          mode="usd"
        />
        <Metric
          value={data.vault.cumulativeStrategistFeeCollectedNative}
          description="Cumulative Strategist Fee (in native)"
          mode="count"
        />
        <Metric
          value={data.vault.cumulativeStrategistFeeCollectedUSD}
          description="Cumulative Strategist Fee (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={VaultStatsDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}
