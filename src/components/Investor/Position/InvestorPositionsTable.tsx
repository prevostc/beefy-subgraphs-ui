import { InvestorPositionsListFragment } from "../../../../.graphclient";
import { ColumnDefType, SimpleTable } from "../../SimpleTable";
import { formatAs } from "../../../utils/format-number";
import { AppLinkButton } from "../../AppLinkButton";

type RowType = InvestorPositionsListFragment["positions"][0] & {
  chain: string;
};
type ColumnKeys =
  | "chain"
  | "vault"
  | "closedPositionDuration"
  | "positionOpenAtTimestamp"
  | "sharesBalance"
  | "initialUnderlyingBalance0"
  | "initialUnderlyingBalance1"
  | "initialUnderlyingBalance0USD"
  | "initialUnderlyingBalance1USD"
  | "initialPositionValueUSD"
  | "underlyingBalance0"
  | "underlyingBalance1"
  | "underlyingBalance0USD"
  | "underlyingBalance1USD"
  | "positionValueUSD"
  | "averageDailyPositionValueUSD30D"
  | "last30DailyPositionValuesUSD"
  | "cumulativeHarvestedAmount0"
  | "cumulativeHarvestedAmount1"
  | "cumulativeHarvestedAmount0USD"
  | "cumulativeHarvestedAmount1USD"
  | "cumulativeHarvestValueUSD"
  | "actions";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "chain",
  "vault",
  "initialPositionValueUSD",
  "underlyingBalance0USD",
  "underlyingBalance1USD",
  "positionValueUSD",
  "cumulativeHarvestValueUSD",
  "actions",
];
type VaultTableColumnDef = ColumnDefType<ColumnKeys, RowType>;

const columns = [
  {
    key: "chain",
    label: "Chain",
    render: (position) => <div>{position.chain}</div>,
  },
  {
    key: "vault",
    label: "Vault",
    render: (position) => <div>{position.vault.sharesToken.name}</div>,
  },
  {
    key: "closedPositionDuration",
    label: "Closed Position Duration",
    render: (position) => (
      <div>{formatAs(position.closedPositionDuration, "duration")}</div>
    ),
  },
  {
    key: "positionOpenAtTimestamp",
    label: "Position Open At",
    render: (position) => (
      <div>{formatAs(position.positionOpenAtTimestamp, "date")}</div>
    ),
  },
  {
    key: "sharesBalance",
    label: "Shares balance",
    render: (position) => (
      <div>{formatAs(position.sharesBalance, "float")}</div>
    ),
  },
  {
    key: "initialUnderlyingBalance0",
    label: "Initial underlying balance 0",
    render: (position) => (
      <div>{formatAs(position.initialUnderlyingBalance0, "float")}</div>
    ),
  },
  {
    key: "initialUnderlyingBalance1",
    label: "Initial underlying balance 1",
    render: (position) => (
      <div>{formatAs(position.initialUnderlyingBalance1, "float")}</div>
    ),
  },
  {
    key: "initialUnderlyingBalance0USD",
    label: "Initial underlying balance 0 USD",
    render: (position) => (
      <div>{formatAs(position.initialUnderlyingBalance0USD, "usd")}</div>
    ),
  },
  {
    key: "initialUnderlyingBalance1USD",
    label: "Initial underlying balance 1 USD",
    render: (position) => (
      <div>{formatAs(position.initialUnderlyingBalance1USD, "usd")}</div>
    ),
  },
  {
    key: "initialPositionValueUSD",
    label: "Initial position value USD",
    render: (position) => (
      <div>{formatAs(position.initialPositionValueUSD, "usd")}</div>
    ),
  },
  {
    key: "underlyingBalance0",
    label: "Underlying balance 0",
    render: (position) => (
      <div>{formatAs(position.underlyingBalance0, "float")}</div>
    ),
  },
  {
    key: "underlyingBalance1",
    label: "Underlying balance 1",
    render: (position) => (
      <div>{formatAs(position.underlyingBalance1, "float")}</div>
    ),
  },
  {
    key: "underlyingBalance0USD",
    label: "Underlying balance 0 USD",
    render: (position) => (
      <div>{formatAs(position.underlyingBalance0USD, "usd")}</div>
    ),
  },
  {
    key: "underlyingBalance1USD",
    label: "Underlying balance 1 USD",
    render: (position) => (
      <div>{formatAs(position.underlyingBalance1USD, "usd")}</div>
    ),
  },
  {
    key: "positionValueUSD",
    label: "Position value USD",
    render: (position) => (
      <div>{formatAs(position.positionValueUSD, "usd")}</div>
    ),
  },
  {
    key: "averageDailyPositionValueUSD30D",
    label: "Average daily position value USD 30D",
    render: (position) => (
      <div>{formatAs(position.averageDailyPositionValueUSD30D, "usd")}</div>
    ),
  },
  {
    key: "last30DailyPositionValuesUSD",
    label: "Last 30 daily position values USD",
    render: (position) => (
      <div>
        {position.last30DailyPositionValuesUSD
          .map((v) => formatAs(v, "usd"))
          .join(" → ")}
      </div>
    ),
  },
  {
    key: "cumulativeHarvestedAmount0",
    label: "Cumulative harvested amount 0",
    render: (position) => (
      <div>{formatAs(position.cumulativeHarvestedAmount0, "float")}</div>
    ),
  },
  {
    key: "cumulativeHarvestedAmount1",
    label: "Cumulative harvested amount 1",
    render: (position) => (
      <div>{formatAs(position.cumulativeHarvestedAmount1, "float")}</div>
    ),
  },
  {
    key: "cumulativeHarvestedAmount0USD",
    label: "Cumulative harvested amount 0 USD",
    render: (position) => (
      <div>{formatAs(position.cumulativeHarvestedAmount0USD, "usd")}</div>
    ),
  },
  {
    key: "cumulativeHarvestedAmount1USD",
    label: "Cumulative harvested amount 1 USD",
    render: (position) => (
      <div>{formatAs(position.cumulativeHarvestedAmount1USD, "usd")}</div>
    ),
  },
  {
    key: "cumulativeHarvestValueUSD",
    label: "Cumulative harvest value USD",
    render: (position) => (
      <div>{formatAs(position.cumulativeHarvestValueUSD, "usd")}</div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (position) => (
      <div className="flex gap-unit-sm">
        <AppLinkButton
          to={`/vault/$chain/$address`}
          params={{ chain: position.chain, address: position.vault.address }}
          variant="faded"
        >
          vault
        </AppLinkButton>
        <AppLinkButton
          to={`/investor/position/$chain/$id`}
          params={{ chain: position.chain, id: position.id }}
        >
          👀
        </AppLinkButton>
      </div>
    ),
  },
] as VaultTableColumnDef[];

export function InvestorPositionsTable({ data }: { data: RowType[] }) {
  return (
    <SimpleTable
      data={data}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      aria-label="Vaults"
    />
  );
}
