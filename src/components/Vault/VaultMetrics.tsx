import { useQuery } from "urql";
import { VaultStatsDocument } from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { TokenBlock } from "../TokenBlock";
import { TransactionBlock } from "../TransactionBlock";
import { VaultAddressesBlock } from "../VaultAddressesBlock";
import Metric from "../NumericMetric";
import { Section } from "../Section";
import { PageBody } from "../PageBody";

export function VaultMetrics({ address }: { address: string }) {
  const [result, _] = useQuery({
    query: VaultStatsDocument,
    variables: {
      address,
    },
  });

  if (result.fetching || !result.data || !result.data.vault) {
    return <Spinner size="lg" />;
  }

  return (
    <PageBody>
      <Section.Title>Configuration</Section.Title>
      <Section.Metrics>
        <TransactionBlock
          transaction={result.data.vault.createdWith}
          description="Created with"
        />
        <TokenBlock
          token={result.data.vault.sharesToken}
          description="Shares"
        />
        <TokenBlock
          token={result.data.vault.underlyingToken0}
          description="Underlying token 0"
        />
        <TokenBlock
          token={result.data.vault.underlyingToken1}
          description="Underlying token 1"
        />
        <VaultAddressesBlock
          vaultAddresses={result.data.vault}
          description="Addresses"
        />
      </Section.Metrics>

      <Section.Title>Prices</Section.Title>
      <Section.Metrics>
        <Metric
          value={result.data.vault.currentPriceOfToken0InToken1}
          description="Current Pool Price (in token 1)"
          mode="float"
        />
        <Metric
          value={result.data.vault.priceRangeMin1}
          description="Price range min (in token 1)"
          mode="float"
        />
        <Metric
          value={result.data.vault.priceRangeMax1}
          description="Price range max (in token 1)"
          mode="float"
        />
        <Metric
          value={result.data.vault.priceRangeMin1USD}
          description="Price range min (in USD)"
          mode="usd"
        />
        <Metric
          value={result.data.vault.priceRangeMax1USD}
          description="Price range max (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Balances</Section.Title>
      <Section.Metrics>
        <Metric
          value={result.data.vault.underlyingAmount0}
          description="Underlying token balance 0"
          mode="count"
        />
        <Metric
          value={result.data.vault.underlyingAmount1}
          description="Underlying token balance 1"
          mode="count"
        />
        <Metric
          value={result.data.vault.underlyingAmount0USD}
          description="Underlying token balance 0 (in USD)"
          mode="usd"
        />
        <Metric
          value={result.data.vault.underlyingAmount1USD}
          description="Underlying token balance 1 (in USD)"
          mode="usd"
        />
        <Metric
          value={result.data.vault.totalValueLockedUSD}
          description="Total Value Locked (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Counts</Section.Title>
      <Section.Metrics>
        <Metric
          value={result.data.vault.totalHarvestCount}
          description="Harvest count"
          mode="count"
        />
        <Metric
          value={result.data.vault.totalDepositCount}
          description="Deposits"
          mode="count"
        />
        <Metric
          value={result.data.vault.totalWithdrawCount}
          description="Withdrawals"
          mode="count"
        />
        <Metric
          value={result.data.vault.totalTransferCount}
          description="Transfers"
          mode="count"
        />
      </Section.Metrics>

      <Section.Title>Harvest</Section.Title>
      <Section.Metrics>
        <Metric
          value={result.data.vault.totalHarvestedAmount0}
          description="Total Harvested token 0"
          mode="count"
        />
        <Metric
          value={result.data.vault.totalHarvestedAmount1}
          description="Total Harvested token 1"
          mode="count"
        />
        <Metric
          value={result.data.vault.totalHarvestedAmount0USD}
          description="Total Harvested token 0 (in USD)"
          mode="usd"
        />
        <Metric
          value={result.data.vault.totalHarvestedAmount1USD}
          description="Total Harvested token 1 (in USD)"
          mode="usd"
        />
        <Metric
          value={result.data.vault.totalHarvestValueUSD}
          description="Total Harvested (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Fees</Section.Title>
      <Section.Metrics>
        <Metric
          value={result.data.vault.totalHarvesterFeeCollectedNative}
          description="Total Harvested Fee (in native)"
          mode="count"
        />
        <Metric
          value={result.data.vault.totalHarvesterFeeCollectedUSD}
          description="Total Harvested Fee (in USD)"
          mode="usd"
        />
        <Metric
          value={result.data.vault.totalProtocolFeeCollectedNative}
          description="Total Protocol Fee (in native)"
          mode="count"
        />
        <Metric
          value={result.data.vault.totalProtocolFeeCollectedUSD}
          description="Total Protocol Fee (in USD)"
          mode="usd"
        />
        <Metric
          value={result.data.vault.totalStrategistFeeCollectedNative}
          description="Total Strategist Fee (in native)"
          mode="count"
        />
        <Metric
          value={result.data.vault.totalStrategistFeeCollectedUSD}
          description="Total Strategist Fee (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={VaultStatsDocument} result={result.data} />
      </Section.Body>
    </PageBody>
  );
}
