import { InvestorFragment } from "../../../.graphclient";
import Metric from "../NumericMetric";
import { Section } from "../Section";

export function InvestorMetrics({ investor }: { investor: InvestorFragment }) {
  return (
    <>
      <Section.Title>Investor</Section.Title>
      <Section.Body>
        <Metric
          value={investor.closedInvestmentDuration}
          description="Closed Investment Duration"
          mode="duration"
        />
        <Metric
          value={investor.currentInvestmentOpenAtTimestamp}
          description="Current Investment Open At"
          mode="date"
        />
        <Metric
          value={investor.activePositionCount}
          description="Active Positions"
          mode="count"
        />
        <Metric
          value={investor.totalPositionValueUSD}
          description="Total Position Value"
          mode="usd"
        />
        <Metric
          value={investor.averageDailyTotalPositionValueUSD30D}
          description="Average Daily Position Value (30D)"
          mode="usd"
        />
        <Metric
          value={investor.totalInteractionsCount}
          description="Total Interactions"
          mode="count"
        />
      </Section.Body>
    </>
  );
}
