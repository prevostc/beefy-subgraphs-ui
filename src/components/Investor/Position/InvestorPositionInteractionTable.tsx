import { InvestorPositionInteractionFragment } from "../../../../.graphclient";
import { HexDisplay } from "../../HexDisplay";
import { ColumnDefType, SimpleTable } from "../../SimpleTable";
import { formatAs } from "../../../utils/format-number";

type RowType = InvestorPositionInteractionFragment;

type ColumnKeys =
  | "createdWith"
  | "timestamp"
  | "investor"
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
  "investor",
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
    key: "investor",
    label: "Investor",
    render: (interaction) => (
      <HexDisplay hexString={interaction.investor.address} />
    ),
  },
  {
    key: "timestamp",
    label: "Timestamp",
    render: (interaction) => (
      <div>{formatAs(interaction.timestamp, "datetime")}</div>
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

export function InvestorPositionInteractionTable({
  data,
}: {
  data: RowType[];
}) {
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
