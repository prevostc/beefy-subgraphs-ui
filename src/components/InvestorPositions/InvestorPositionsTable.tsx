import { InvestorPositionsListFragment } from "../../../.graphclient";
import { ColumnDefType, SimpleTable } from "../SimpleTable/SimpleTable";
import { formatAs } from "../../utils/format-number";
import { AppLinkButton } from "../AppLinkButton";

type ColumnKeys =
  | "vault"
  | "underlyingBalance0"
  | "underlyingBalance1"
  | "underlyingBalance0USD"
  | "underlyingBalance1USD"
  | "positionValueUSD"
  | "averageDailyPositionValueUSD30D"
  | "last30DailyPositionValuesUSD"
  | "lastUpdated"
  | "totalActiveTime"
  | "actions";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "vault",
  "positionValueUSD",
  "totalActiveTime",
  "lastUpdated",
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
    key: "totalActiveTime",
    label: "Total active time",
    render: (position) => (
      <div>{formatAs(position.totalActiveTime, "duration")}</div>
    ),
  },
  {
    key: "lastUpdated",
    label: "Last updated",
    render: (position) => <div>{formatAs(position.lastUpdated, "date")}</div>,
  },
  {
    key: "actions",
    label: "Actions",
    render: (position) => (
      <div className="flex gap-unit-sm">
        <AppLinkButton
          to={`/vault/$address`}
          params={{ id: position.vault.id }}
          variant="faded"
        >
          vault
        </AppLinkButton>
        <AppLinkButton
          to={`/vault/$address`}
          params={{ id: position.vault.id }}
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
