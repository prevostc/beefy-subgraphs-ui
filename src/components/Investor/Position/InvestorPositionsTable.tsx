import { InvestorPositionsListFragment } from "../../../../.graphclient";
import { ColumnDefType, SimpleTable } from "../../SimpleTable";
import { formatAs } from "../../../utils/format-number";
import { AppLinkButton } from "../../AppLinkButton";

type ColumnKeys =
  | "vault"
  | "closedPositionDuration"
  | "positionOpenAtTimestamp"
  | "sharesBalance"
  | "underlyingBalance0"
  | "underlyingBalance1"
  | "underlyingBalance0USD"
  | "underlyingBalance1USD"
  | "positionValueUSD"
  | "averageDailyPositionValueUSD30D"
  | "last30DailyPositionValuesUSD"
  | "actions";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "vault",
  "positionValueUSD",
  "underlyingBalance0USD",
  "underlyingBalance1USD",
  "actions",
];
type RowType = InvestorPositionsListFragment["positions"][0];
type VaultTableColumnDef = ColumnDefType<ColumnKeys, RowType>;

const columns = [
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
    key: "actions",
    label: "Actions",
    render: (position) => (
      <div className="flex gap-unit-sm">
        <AppLinkButton
          to={`/vault/$address`}
          params={{ address: position.vault.address }}
          variant="faded"
        >
          vault
        </AppLinkButton>
        <AppLinkButton
          to={`/investor/position/$id`}
          params={{ id: position.id }}
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
