import { useQuery } from "urql";
import { VaultStatsDocument } from "../../../.graphclient";
import { Divider, Spinner } from "@nextui-org/react";
import QueryDebug from "../QueryDebug";
import { TokenDataTable } from "../TokenDataTable";
import { TokenBlock } from "../TokenBlock";
import { TransactionBlock } from "../TransactionBlock";
import { VaultAddressesBlock } from "../VaultAddressesBlock";
import Metric from "../NumericMetric";

export function VaultMetrics({ vaultAddress }: { vaultAddress: string }) {
  const [result, _] = useQuery({
    query: VaultStatsDocument,
    variables: {
      vaultAddress,
    },
  });

  if (result.fetching || !result.data || !result.data.vault) {
    return <Spinner size="lg" />;
  }
  return (
    <div>
      <h1 className="text-default-800 text-2xl mb-unit-md">
        Vault configuration
      </h1>
      <Divider />
      <div className="flex flex-wrap justify-between gap-unit-md py-unit-xl">
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
      </div>
      <h1 className="text-default-800 text-2xl mb-unit-md">Prices</h1>
      <Divider />
      <div className="flex flex-wrap justify-between gap-unit-md py-unit-xl">
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
      </div>

      <h1 className="text-default-800 text-2xl mb-unit-md">Balances</h1>
      <Divider />
      <div className="flex flex-wrap justify-between gap-unit-md py-unit-xl">
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
      </div>

      <h1 className="text-default-800 text-2xl mb-unit-md">Counts</h1>
      <Divider />
      <div className="flex flex-wrap justify-between gap-unit-md py-unit-xl">
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
      </div>

      <h1 className="text-default-800 text-2xl mb-unit-md">Harvest</h1>
      <Divider />
      <div className="flex flex-wrap justify-between gap-unit-md py-unit-xl">
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
      </div>

      <h1 className="text-default-800 text-2xl mb-unit-md">Fees</h1>
      <Divider />
      <div className="flex flex-wrap justify-between gap-unit-md py-unit-xl">
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
      </div>

      <QueryDebug query={VaultStatsDocument} result={result.data} />
    </div>
  );
}
