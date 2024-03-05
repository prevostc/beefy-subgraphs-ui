import { useQuery } from "urql";
import {
  InvestorSnapshotFragment,
  VaultStatsDocument,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { InvestorMetrics } from "./InvestorMetrics";
import { Section } from "../Section";
import { InvestorPositionsTable } from "./Position/InvestorPositionsTable";
import Decimal from "decimal.js";
import { SimpleDailyTsChart } from "../SimpleDailyTsChart";
import { InvestorDashboardDocument } from "../../../.graphclient/index";
import {
  SnapshotTimeseries,
  SnapshotTimeseriesConfig,
} from "../SnapshotTimeseries";
import { PageBody } from "../PageBody";

type SnapshotType = InvestorSnapshotFragment;
const investorTimeseriesConfigs: SnapshotTimeseriesConfig<SnapshotType>[] = [
  { key: "totalPositionValueUSD", format: "usd" },
  { key: "interactionsCount", format: "count" },
  { key: "depositCount", format: "count" },
  { key: "withdrawCount", format: "count" },
];

export function InvestorDashboard({ address }: { address: string }) {
  const [result, _] = useQuery({
    query: InvestorDashboardDocument,
    variables: {
      address,
    },
  });

  if (result.fetching || !result.data || !result.data.investor) {
    return <Spinner size="lg" />;
  }

  return (
    <PageBody>
      <InvestorMetrics investor={result.data.investor} />
      <Section.Title>Positions</Section.Title>
      <Section.Body>
        <InvestorPositionsTable data={result.data.investor.positions} />
      </Section.Body>

      <Section.Title>Last 30 days Wallet value</Section.Title>
      <Section.Body>
        <SimpleDailyTsChart
          data={result.data.investor.last30DailyTotalPositionValuesUSD.map(
            (v: string) => new Decimal(v).toNumber()
          )}
        />
      </Section.Body>

      <Section.Title>Timeseries</Section.Title>
      <Section.Body>
        <SnapshotTimeseries
          data={result.data.investor.dailySnapshots}
          config={investorTimeseriesConfigs}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={VaultStatsDocument} result={result.data} />
      </Section.Body>
    </PageBody>
  );
}
