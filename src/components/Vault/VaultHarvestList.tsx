import { VaultHarvestFragment } from "../../../.graphclient";
import { ColumnDefType, SimpleTable } from "../SimpleTable";
import { formatAs } from "../../utils/format-number";
import { HexDisplay } from "../HexDisplay";

type RowType = VaultHarvestFragment;

type ColumnKeys =
  | "createdWith"
  | "timestamp"
  | "underlyingAmount0"
  | "underlyingAmount1"
  | "underlyingAmount0USD"
  | "underlyingAmount1USD"
  | "totalValueLockedUSD"
  | "compoundedAmount0"
  | "compoundedAmount1"
  | "compoundedAmount0USD"
  | "compoundedAmount1USD"
  | "compoundedValueUSD"
  | "priceOfToken0InToken1"
  | "priceOfToken0InUSD";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "createdWith",
  "timestamp",
  "underlyingAmount0",
  "underlyingAmount1",
  "underlyingAmount0USD",
  "underlyingAmount1USD",
  "totalValueLockedUSD",
  "compoundedAmount0",
  "compoundedAmount1",
  "compoundedAmount0USD",
  "compoundedAmount1USD",
  "compoundedValueUSD",
  "priceOfToken0InToken1",
  "priceOfToken0InUSD",
];
type VaultHarvestTableColumnDef = ColumnDefType<ColumnKeys, RowType>;

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
    key: "compoundedAmount0",
    label: "Compounded Amount 0",
    render: (row) => <div>{formatAs(row.compoundedAmount0, "float")}</div>,
  },
  {
    key: "compoundedAmount1",
    label: "Compounded Amount 1",
    render: (row) => <div>{formatAs(row.compoundedAmount1, "float")}</div>,
  },
  {
    key: "compoundedAmount0USD",
    label: "Compounded Amount 0 USD",
    render: (row) => <div>{formatAs(row.compoundedAmount0USD, "usd")}</div>,
  },
  {
    key: "compoundedAmount1USD",
    label: "Compounded Amount 1 USD",
    render: (row) => <div>{formatAs(row.compoundedAmount1USD, "usd")}</div>,
  },
  {
    key: "compoundedValueUSD",
    label: "Harvest Value USD",
    render: (row) => <div>{formatAs(row.compoundedValueUSD, "usd")}</div>,
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
] as VaultHarvestTableColumnDef[];

export function VaultHarvestTable({ data }: { data: RowType[] }) {
  return (
    <SimpleTable
      data={data}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      aria-label="Vaults"
    />
  );
}
