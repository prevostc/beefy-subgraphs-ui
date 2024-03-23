import { InvestorFragment } from "../../../.graphclient";
import { ChainMetric } from "../ChainMetric";
import { Section } from "../Section";

export function InvestorMetrics({
  investor,
}: {
  investor: (InvestorFragment & { chain: string })[];
}) {
  return (
    <>
      <Section.Title>Investor</Section.Title>
      <Section.Body>
        <ChainMetric
          description="Closed Investment Duration"
          mode="duration"
          values={investor}
          get={(v) => v.closedInvestmentDuration}
        />
        <ChainMetric
          description="Current Investment Open At"
          mode="date"
          values={investor}
          get={(v) => v.currentInvestmentOpenAtTimestamp}
        />
        <ChainMetric
          description="Active Position Count"
          mode="count"
          values={investor}
          get={(v) => v.activePositionCount}
        />
        <ChainMetric
          description="Total Position Value"
          mode="usd"
          values={investor}
          get={(v) => v.totalPositionValueUSD}
        />
        <ChainMetric
          description="Average Daily Position Value (30D)"
          mode="usd"
          values={investor}
          get={(v) => v.averageDailyTotalPositionValueUSD30D}
        />
        <ChainMetric
          description="Cumulative Interactions Count"
          mode="count"
          values={investor}
          get={(v) => v.cumulativeInteractionsCount}
        />
        <ChainMetric
          description="Cumulative Deposits Count"
          mode="count"
          values={investor}
          get={(v) => v.cumulativeDepositCount}
        />
        <ChainMetric
          description="Cumulative Withdrawals Count"
          mode="count"
          values={investor}
          get={(v) => v.cumulativeWithdrawCount}
        />
        <ChainMetric
          description="Cumulative Compounded Value (USD)"
          mode="usd"
          values={investor}
          get={(v) => v.cumulativeCompoundedValueUSD}
        />
      </Section.Body>
    </>
  );
}
