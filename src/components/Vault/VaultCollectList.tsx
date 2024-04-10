import { VaultCollectFragment } from "../../../.graphclient";
import { ColumnDefType, SimpleTable } from "../SimpleTable";
import { formatAs } from "../../utils/format-number";
import { HexDisplay } from "../HexDisplay";

type RowType = VaultCollectFragment;

type ColumnKeys =
  | "createdWith"
  | "timestamp"
  | "underlyingAmount0"
  | "underlyingAmount1"
  | "underlyingAmount0USD"
  | "underlyingAmount1USD"
  | "totalValueLockedUSD"
  | "collectedAmount0"
  | "collectedAmount1"
  | "collectedAmountEarned"
  | "collectedAmount0USD"
  | "collectedAmount1USD"
  | "collectedAmountEarnedUSD"
  | "collectValueUSD"
  | "priceOfToken0InToken1"
  | "priceOfToken0InUSD"
  | "priceOfToken1InUSD"
  | "collectedAmountEarnedUSD";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "createdWith",
  "timestamp",
  "underlyingAmount0",
  "underlyingAmount1",
  "underlyingAmount0USD",
  "underlyingAmount1USD",
  "totalValueLockedUSD",
  "collectedAmount0",
  "collectedAmount1",
  "collectedAmountEarned",
  "collectedAmount0USD",
  "collectedAmount1USD",
  "collectedAmountEarnedUSD",
  "collectValueUSD",
  "priceOfToken0InToken1",
  "priceOfToken0InUSD",
  "priceOfToken1InUSD",
  "collectedAmountEarnedUSD",
];
type VaultCollectTableColumnDef = ColumnDefType<ColumnKeys, RowType>;

const columns = [
  {
    key: "createdWith",
    label: "Created With",
    render: (row) => <HexDisplay hexString={row.createdWith.transactionHash} />,
  },
  {
    key: "timestamp",
    label: "Timestamp",
    render: (row) => <div>{formatAs(row.timestamp, "datetime")}</div>,
  },
  {
    key: "underlyingAmount0",
    label: "Underlying Amount 0",
    render: (row) => <div>{formatAs(row.underlyingAmount0, "float")}</div>,
  },
  {
    key: "underlyingAmount1",
    label: "Underlying Amount 1",
    render: (row) => <div>{formatAs(row.underlyingAmount1, "float")}</div>,
  },
  {
    key: "underlyingAmount0USD",
    label: "Underlying Amount 0 USD",
    render: (row) => <div>{formatAs(row.underlyingAmount0USD, "usd")}</div>,
  },
  {
    key: "underlyingAmount1USD",
    label: "Underlying Amount 1 USD",
    render: (row) => <div>{formatAs(row.underlyingAmount1USD, "usd")}</div>,
  },
  {
    key: "totalValueLockedUSD",
    label: "Total Value Locked USD",
    render: (row) => <div>{formatAs(row.totalValueLockedUSD, "usd")}</div>,
  },
  {
    key: "collectedAmount0",
    label: "Collected Amount 0",
    render: (row) => <div>{formatAs(row.collectedAmount0, "float")}</div>,
  },
  {
    key: "collectedAmount1",
    label: "Collected Amount 1",
    render: (row) => <div>{formatAs(row.collectedAmount1, "float")}</div>,
  },
  {
    key: "collectedAmountEarned",
    label: "Collected Amount Earned",
    render: (row) => <div>{formatAs(row.collectedAmountEarned, "float")}</div>,
  },
  {
    key: "collectedAmount0USD",
    label: "Collected Amount 0 USD",
    render: (row) => <div>{formatAs(row.collectedAmount0USD, "usd")}</div>,
  },
  {
    key: "collectedAmount1USD",
    label: "Collected Amount 1 USD",
    render: (row) => <div>{formatAs(row.collectedAmount1USD, "usd")}</div>,
  },
  {
    key: "collectedAmountEarnedUSD",
    label: "Collected Amount Earned USD",
    render: (row) => <div>{formatAs(row.collectedAmountEarnedUSD, "usd")}</div>,
  },
  {
    key: "collectedValueUSD",
    label: "Collect Value USD",
    render: (row) => <div>{formatAs(row.collectedValueUSD, "usd")}</div>,
  },
  {
    key: "priceOfToken0InToken1",
    label: "Price Of Token 0 In Token 1",
    render: (row) => <div>{formatAs(row.priceOfToken0InToken1, "float")}</div>,
  },
  {
    key: "priceOfToken0InUSD",
    label: "Price Of Token 0 In USD",
    render: (row) => <div>{formatAs(row.priceOfToken0InUSD, "usd")}</div>,
  },
  {
    key: "priceOfToken1InUSD",
    label: "Price Of Token 1 In USD",
    render: (row) => <div>{formatAs(row.priceOfToken1InUSD, "usd")}</div>,
  },
  {
    key: "collectedAmountEarnedUSD",
    label: "Price Of Earned Token In USD",
    render: (row) => <div>{formatAs(row.collectedAmountEarnedUSD, "usd")}</div>,
  },
] as VaultCollectTableColumnDef[];

export function VaultCollectTable({ data }: { data: RowType[] }) {
  return (
    <SimpleTable
      data={data}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      aria-label="Vaults"
    />
  );
}
