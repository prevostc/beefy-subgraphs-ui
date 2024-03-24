import {
  VaultAddressesFragment,
  VaultMetricsFragment,
} from "../../../.graphclient";
import { TokenBlock } from "../TokenBlock";
import { TransactionBlock } from "../TransactionBlock";
import { VaultAddressesBlock } from "../VaultAddressesBlock";
import { Metric } from "../Metric";
import { Section } from "../Section";

export function VaultMetrics({
  vault,
}: {
  vault: VaultMetricsFragment & VaultAddressesFragment;
}) {
  return (
    <>
      <Section.Title>Configuration</Section.Title>
      <Section.Metrics>
        <TransactionBlock
          transaction={vault.createdWith}
          description="Created with"
        />
        <TokenBlock token={vault.sharesToken} description="Shares" />
        <TokenBlock
          token={vault.underlyingToken0}
          description="Underlying token 0"
        />
        <TokenBlock
          token={vault.underlyingToken1}
          description="Underlying token 1"
        />
        <VaultAddressesBlock vaultAddresses={vault} description="Addresses" />
      </Section.Metrics>

      <Section.Title>Prices</Section.Title>
      <Section.Metrics>
        <Metric
          value={vault.currentPriceOfToken0InToken1}
          description="Current Pool Price (in token 1)"
          mode="float"
        />
        <Metric
          value={vault.priceRangeMin1}
          description="Price range min (in token 1)"
          mode="float"
        />
        <Metric
          value={vault.priceRangeMax1}
          description="Price range max (in token 1)"
          mode="float"
        />
        <Metric
          value={vault.priceRangeMinUSD}
          description="Price range min (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.currentPriceOfToken0InUSD}
          description="Current Pool Price (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.priceRangeMaxUSD}
          description="Price range max (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Balances</Section.Title>
      <Section.Metrics>
        <Metric
          value={vault.underlyingAmount0}
          description="Underlying token balance 0"
          mode="count"
        />
        <Metric
          value={vault.underlyingAmount1}
          description="Underlying token balance 1"
          mode="count"
        />
        <Metric
          value={vault.underlyingAmount0USD}
          description="Underlying token balance 0 (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.underlyingAmount1USD}
          description="Underlying token balance 1 (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.totalValueLockedUSD}
          description="Total Value Locked (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Counts</Section.Title>
      <Section.Metrics>
        <Metric
          value={vault.cumulativeHarvestCount}
          description="Harvests"
          mode="count"
        />
        <Metric
          value={vault.cumulativeDepositCount}
          description="Deposits"
          mode="count"
        />
        <Metric
          value={vault.cumulativeWithdrawCount}
          description="Withdrawals"
          mode="count"
        />
        <Metric
          value={vault.cumulativeTransferCount}
          description="Transfers"
          mode="count"
        />
      </Section.Metrics>

      <Section.Title>Harvest</Section.Title>
      <Section.Metrics>
        <Metric
          value={vault.cumulativeCompoundedAmount0}
          description="Cumulative Compounded token 0"
          mode="count"
        />
        <Metric
          value={vault.cumulativeCompoundedAmount1}
          description="Cumulative Compounded token 1"
          mode="count"
        />
        <Metric
          value={vault.cumulativeCompoundedAmount0USD}
          description="Cumulative Compounded token 0 (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.cumulativeCompoundedAmount1USD}
          description="Cumulative Compounded token 1 (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.cumulativeCompoundedValueUSD}
          description="Cumulative Compounded (in USD)"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Fees</Section.Title>
      <Section.Metrics>
        <Metric
          value={vault.cumulativeHarvesterFeeCollectedNative}
          description="Cumulative Compounded Fee (in native)"
          mode="count"
        />
        <Metric
          value={vault.cumulativeHarvesterFeeCollectedUSD}
          description="Cumulative Compounded Fee (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.cumulativeProtocolFeeCollectedNative}
          description="Cumulative Protocol Fee (in native)"
          mode="count"
        />
        <Metric
          value={vault.cumulativeProtocolFeeCollectedUSD}
          description="Cumulative Protocol Fee (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.cumulativeStrategistFeeCollectedNative}
          description="Cumulative Strategist Fee (in native)"
          mode="count"
        />
        <Metric
          value={vault.cumulativeStrategistFeeCollectedUSD}
          description="Cumulative Strategist Fee (in USD)"
          mode="usd"
        />
        <Metric
          value={vault.lastCollectedFeeTimestamp}
          description="Last Collected Fee Timestamp"
          mode="datetime"
        />
        <Metric
          value={vault.annualPercentageRateFromLastCollection}
          description="APR from last collection"
          mode="percent"
        />
      </Section.Metrics>
    </>
  );
}
