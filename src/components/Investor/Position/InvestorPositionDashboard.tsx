import { useQuery } from "@tanstack/react-query";
import {
  InvestorPositionDashboardDocument,
  InvestorPositionInteractionFragment,
  InvestorPositionSnapshotFragment,
  getBuiltGraphSDK,
} from "../../../../.graphclient";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import { QueryDebug } from "../../QueryDebug";
import { StackedLineTimeseries } from "../../StackedLineTimeseries";
import { Section } from "../../Section";
import { Metric } from "../../Metric";
import { SimpleDailyTsChart } from "../../SimpleDailyTsChart";
import Decimal from "decimal.js";
import { AppLink } from "../../AppLink";
import { HexDisplay } from "../../HexDisplay";
import { PageBody } from "../../PageBody";
import { ColumnDefType, SimpleTable } from "../../SimpleTable";
import { formatAs } from "../../../utils/format-number";

const sdk = getBuiltGraphSDK();
const createFetchData = (chain: string, id: string) => async () => {
  return sdk
    .InvestorPositionDashboard({ id }, { chainName: chain })
    .then((data) => ({ ...data, chain }));
};

export function InvestorPositionDashboard({
  chain,
  id,
}: {
  chain: string;
  id: string;
}) {
  const { isPending, error, data } = useQuery({
    queryKey: ["investorPositionDashboard"],
    queryFn: createFetchData(chain, id),
  });

  if (isPending) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  if (!data || !data.investorPosition) {
    return <pre>Error: No data</pre>;
  }

  return (
    <PageBody>
      <Section.Title>Position</Section.Title>
      <Breadcrumbs>
        <BreadcrumbItem>Vault</BreadcrumbItem>
        <BreadcrumbItem>
          <AppLink
            to={"/vault/$chain/$address"}
            params={{ chain, address: data.investorPosition.vault.address }}
          >
            {data.investorPosition.vault.sharesToken.name}
          </AppLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Investor</BreadcrumbItem>
        <BreadcrumbItem>
          <AppLink
            to={"/investor/$address"}
            params={{ address: data.investorPosition.investor.address }}
          >
            <HexDisplay
              hexString={data.investorPosition.investor.address}
              showChars={20}
            />
          </AppLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Position</BreadcrumbItem>
      </Breadcrumbs>

      <Section.Metrics>
        <Metric
          value={data.investorPosition.closedPositionDuration}
          description="Closed Position Duration"
          mode="duration"
        />
        <Metric
          value={data.investorPosition.positionOpenAtTimestamp}
          description="Position Open At"
          mode="date"
        />
        <Metric
          value={data.investorPosition.sharesBalance}
          description="Shares"
          mode="count"
        />
        <Metric
          value={data.investorPosition.initialUnderlyingBalance0}
          description="Initial Underlying balance 0"
          mode="count"
        />
        <Metric
          value={data.investorPosition.initialUnderlyingBalance1}
          description="Initial Underlying balance 1"
          mode="count"
        />
        <Metric
          value={data.investorPosition.initialUnderlyingBalance0USD}
          description="Initial Underlying balance 0 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.initialUnderlyingBalance1USD}
          description="Initial Underlying balance 1 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.positionValueUSD}
          description="Position value USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.underlyingBalance0}
          description="Underlying balance 0"
          mode="count"
        />
        <Metric
          value={data.investorPosition.underlyingBalance1}
          description="Underlying balance 1"
          mode="count"
        />
        <Metric
          value={data.investorPosition.underlyingBalance0USD}
          description="Underlying balance 0 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.underlyingBalance1USD}
          description="Underlying balance 1 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.positionValueUSD}
          description="Position value USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.averageDailyPositionValueUSD30D}
          description="Position value USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedAmount0}
          description="Cumulative Compounded Amount 0"
          mode="count"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedAmount1}
          description="Cumulative Compounded Amount 1"
          mode="count"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedAmount0USD}
          description="Cumulative Compounded Amount 0 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedAmount1USD}
          description="Cumulative Compounded Amount 1 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedValueUSD}
          description="Cumulative Compounded Value USD"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Interactions</Section.Title>
      <Section.Body>
        <InvestorPositionInteractionTable
          data={data.investorPosition.interactions}
        />
      </Section.Body>

      <Section.Title>Last 30 days position value</Section.Title>
      <Section.Body>
        <SimpleDailyTsChart
          data={data.investorPosition.last30DailyPositionValuesUSD.map(
            (v: string) => new Decimal(v).toNumber()
          )}
        />
      </Section.Body>

      <Section.Title>Timeseries</Section.Title>
      <Section.Body>
        <StackedLineTimeseries<InvestorPositionSnapshotFragment>
          dataSets={[
            { name: chain, values: data.investorPosition.dailySnapshots },
          ]}
          config={[
            { key: "sharesBalance", format: "float" },
            { key: "underlyingBalance0", format: "float" },
            { key: "underlyingBalance1", format: "float" },
            { key: "underlyingBalance0USD", format: "usd" },
            { key: "underlyingBalance1USD", format: "usd" },
            { key: "positionValueUSD", format: "usd" },
            { key: "compoundedAmount0", format: "float" },
            { key: "compoundedAmount1", format: "float" },
            { key: "compoundedAmount0USD", format: "usd" },
            { key: "compoundedAmount1USD", format: "usd" },
            { key: "compoundedValueUSD", format: "usd" },
          ]}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={InvestorPositionDashboardDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}

type RowType = InvestorPositionInteractionFragment;

type ColumnKeys =
  | "createdWith"
  | "timestamp"
  | "type"
  | "sharesBalance"
  | "underlyingBalance0"
  | "underlyingBalance1"
  | "underlyingBalance0USD"
  | "underlyingBalance1USD"
  | "positionValueUSD"
  | "sharesBalanceDelta"
  | "underlyingBalance0Delta"
  | "underlyingBalance1Delta"
  | "underlyingBalance0DeltaUSD"
  | "underlyingBalance1DeltaUSD"
  | "positionValueUSDDelta";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "createdWith",
  "timestamp",
  "type",
  "sharesBalance",
  "positionValueUSD",
  "sharesBalanceDelta",
  "positionValueUSDDelta",
];
type InvestorPositionInteractionColumnDef = ColumnDefType<ColumnKeys, RowType>;

const columns = [
  {
    key: "timestamp",
    label: "Timestamp",
    render: (interaction) => (
      <div>{formatAs(interaction.timestamp * 1000, "datetime")}</div>
    ),
  },
  {
    key: "type",
    label: "Type",
    render: (interaction) => <div>{interaction.type}</div>,
  },
  {
    key: "sharesBalance",
    label: "Shares",
    render: (interaction) => (
      <div>{formatAs(interaction.sharesBalance, "count")}</div>
    ),
  },
  {
    key: "underlyingBalance0",
    label: "Underlying balance 0",
    render: (interaction) => (
      <div>{formatAs(interaction.underlyingBalance0, "count")}</div>
    ),
  },
  {
    key: "underlyingBalance1",
    label: "Underlying balance 1",
    render: (interaction) => (
      <div>{formatAs(interaction.underlyingBalance1, "count")}</div>
    ),
  },
  {
    key: "underlyingBalance0USD",
    label: "Underlying balance 0 USD",
    render: (interaction) => (
      <div>{formatAs(interaction.underlyingBalance0USD, "usd")}</div>
    ),
  },
  {
    key: "underlyingBalance1USD",
    label: "Underlying balance 1 USD",
    render: (interaction) => (
      <div>{formatAs(interaction.underlyingBalance1USD, "usd")}</div>
    ),
  },
  {
    key: "positionValueUSD",
    label: "Position value USD",
    render: (interaction) => (
      <div>{formatAs(interaction.positionValueUSD, "usd")}</div>
    ),
  },
  {
    key: "sharesBalanceDelta",
    label: "Shares delta",
    render: (interaction) => (
      <div>{formatAs(interaction.sharesBalanceDelta, "count")}</div>
    ),
  },
  {
    key: "underlyingBalance0Delta",
    label: "Underlying balance 0 delta",
    render: (interaction) => (
      <div>{formatAs(interaction.underlyingBalance0Delta, "count")}</div>
    ),
  },
  {
    key: "underlyingBalance1Delta",
    label: "Underlying balance 1 delta",
    render: (interaction) => (
      <div>{formatAs(interaction.underlyingBalance1Delta, "count")}</div>
    ),
  },

  {
    key: "underlyingBalance0DeltaUSD",
    label: "Underlying balance 0 delta USD",
    render: (interaction) => (
      <div>{formatAs(interaction.underlyingBalance0DeltaUSD, "usd")}</div>
    ),
  },
  {
    key: "underlyingBalance1DeltaUSD",
    label: "Underlying balance 1 delta USD",
    render: (interaction) => (
      <div>{formatAs(interaction.underlyingBalance1DeltaUSD, "usd")}</div>
    ),
  },
  {
    key: "positionValueUSDDelta",
    label: "Position value USD delta",
    render: (interaction) => (
      <div>{formatAs(interaction.positionValueUSDDelta, "usd")}</div>
    ),
  },
  {
    key: "createdWith",
    label: "Created with",
    render: (interaction) => (
      <HexDisplay hexString={interaction.createdWith.id} />
    ),
  },
] as InvestorPositionInteractionColumnDef[];

function InvestorPositionInteractionTable({ data }: { data: RowType[] }) {
  // sort by timestamp asc
  data.sort((a, b) => a.timestamp - b.timestamp);
  return (
    <SimpleTable
      data={data}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      aria-label="Interactions"
    />
  );
}
