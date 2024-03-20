import { useQuery } from "urql";
import {
  InvestorDashboardDocument,
  InvestorPositionDashboardDocument,
  InvestorPositionSnapshotFragment,
} from "../../../../.graphclient";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import { QueryDebug } from "../../QueryDebug";
import {
  StackedLineTimeseries,
  StackedLineTimeseriesConfig,
} from "../../StackedLineTimeseries";
import { Section } from "../../Section";
import { Metric } from "../../Metric";
import { SimpleDailyTsChart } from "../../SimpleDailyTsChart";
import Decimal from "decimal.js";
import { AppLink } from "../../AppLink";
import { HexDisplay } from "../../HexDisplay";
import { PageBody } from "../../PageBody";

type SnapshotType = InvestorPositionSnapshotFragment;
const positionTimeseriesConfig: StackedLineTimeseriesConfig<SnapshotType>[] = [
  { key: "sharesBalance", format: "count" },
  { key: "underlyingBalance0", format: "count" },
  { key: "underlyingBalance1", format: "count" },
  { key: "underlyingBalance0USD", format: "usd" },
  { key: "underlyingBalance1USD", format: "usd" },
  { key: "positionValueUSD", format: "usd" },
];

export function InvestorPositionDashboard({ id }: { id: string }) {
  const [result, _] = useQuery({
    query: InvestorPositionDashboardDocument,
    variables: {
      id,
    },
  });

  if (result.fetching || !result.data || !result.data.investorPosition) {
    return <Spinner size="lg" />;
  }

  return (
    <PageBody>
      <Section.Title>Position</Section.Title>
      <Breadcrumbs>
        <BreadcrumbItem>Vault</BreadcrumbItem>
        <BreadcrumbItem>
          <AppLink
            to={"/vault/$address"}
            params={{ address: result.data.investorPosition.vault.address }}
          >
            {result.data.investorPosition.vault.sharesToken.name}
          </AppLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Investor</BreadcrumbItem>
        <BreadcrumbItem>
          <AppLink
            to={"/investor/$address"}
            params={{ address: result.data.investorPosition.investor.address }}
          >
            <HexDisplay
              hexString={result.data.investorPosition.investor.address}
              showChars={20}
            />
          </AppLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Position</BreadcrumbItem>
      </Breadcrumbs>

      <Section.Metrics>
        <Metric
          value={result.data.investorPosition.closedPositionDuration}
          description="Closed Position Duration"
          mode="duration"
        />
        <Metric
          value={result.data.investorPosition.positionOpenAtTimestamp}
          description="Position Open At"
          mode="date"
        />
        <Metric
          value={result.data.investorPosition.sharesBalance}
          description="Shares"
          mode="count"
        />
        <Metric
          value={result.data.investorPosition.underlyingBalance0}
          description="Underlying balance 0"
          mode="count"
        />
        <Metric
          value={result.data.investorPosition.underlyingBalance1}
          description="Underlying balance 1"
          mode="count"
        />
        <Metric
          value={result.data.investorPosition.underlyingBalance0USD}
          description="Underlying balance 0 USD"
          mode="usd"
        />
        <Metric
          value={result.data.investorPosition.underlyingBalance1USD}
          description="Underlying balance 1 USD"
          mode="usd"
        />
        <Metric
          value={result.data.investorPosition.positionValueUSD}
          description="Position value USD"
          mode="usd"
        />
        <Metric
          value={result.data.investorPosition.averageDailyPositionValueUSD30D}
          description="Position value USD"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Last 30 days position value</Section.Title>
      <Section.Body>
        <SimpleDailyTsChart
          data={result.data.investorPosition.last30DailyPositionValuesUSD.map(
            (v: string) => new Decimal(v).toNumber()
          )}
        />
      </Section.Body>

      <Section.Title>Timeseries</Section.Title>
      <Section.Body>
        <StackedLineTimeseries
          data={result.data.investorPosition.dailySnapshots}
          config={positionTimeseriesConfig}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug
          query={InvestorDashboardDocument}
          result={result.data.investorPosition}
        />
      </Section.Body>
    </PageBody>
  );
}
