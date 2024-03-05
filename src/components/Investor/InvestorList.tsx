import { useQuery } from "urql";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { ColumnDefType, SimpleTable } from "../SimpleTable";
import { AppLink } from "../AppLink";
import { AppLinkButton } from "../AppLinkButton";
import { InvestorListDocument, InvestorListQuery } from "../../../.graphclient";
import { HexDisplay } from "../HexDisplay";
import { ts2Date } from "../../utils/timestamp-to-date";
import { formatAs } from "../../utils/format-number";

export function InvestorsList() {
  const [result, _] = useQuery({
    query: InvestorListDocument,
  });

  if (result.fetching || !result.data || !result.data.investors) {
    return <Spinner size="lg" />;
  }

  return (
    <div>
      <div>
        <InvestorsTable data={result.data.investors} />
      </div>
      <div className="mt-5">
        <QueryDebug
          query={InvestorListDocument}
          result={result.data.investors}
        />
      </div>
    </div>
  );
}

type ColumnKeys =
  | "address"
  | "closedInvestmentDuration"
  | "currentInvestmentOpenAtTimestamp"
  | "activePositionCount"
  | "totalPositionValueUSD"
  | "averageDailyTotalPositionValueUSD30D"
  | "last30DailyTotalPositionValuesUSD"
  | "cumulativeInteractionsCount"
  | "cumulativeDepositCount"
  | "cumulativeWithdrawCount"
  | "actions";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "address",
  "currentInvestmentOpenAtTimestamp",
  "activePositionCount",
  "totalPositionValueUSD",
  "averageDailyTotalPositionValueUSD30D",
  "cumulativeInteractionsCount",
  "cumulativeDepositCount",
  "cumulativeWithdrawCount",
  "actions",
];
type VaultTableColumnDef = ColumnDefType<
  ColumnKeys,
  InvestorListQuery["investors"][0]
>;

const columns = [
  {
    key: "address",
    label: "Address",
    render: (investor) => <HexDisplay hexString={investor.address} />,
  },
  {
    key: "closedInvestmentDuration",
    label: "Closed investment duration",
    render: (investor) => (
      <div>{formatAs(investor.closedInvestmentDuration, "duration")}</div>
    ),
  },
  {
    key: "currentInvestmentOpenAtTimestamp",
    label: "Current investment open at",
    render: (investor) => (
      <div>{formatAs(investor.currentInvestmentOpenAtTimestamp, "date")}</div>
    ),
  },
  {
    key: "activePositionCount",
    label: "Active position count",
    render: (investor) => <div>{investor.activePositionCount}</div>,
  },
  {
    key: "totalPositionValueUSD",
    label: "Total position value USD",
    render: (investor) => (
      <div>{formatAs(investor.totalPositionValueUSD, "usd")}</div>
    ),
  },
  {
    key: "averageDailyTotalPositionValueUSD30D",
    label: "Average daily total position value USD 30D",
    render: (investor) => (
      <div>
        {formatAs(investor.averageDailyTotalPositionValueUSD30D, "usd")}
      </div>
    ),
  },
  {
    key: "last30DailyTotalPositionValuesUSD",
    label: "Last 30 daily total position values USD",
    render: (investor) => (
      <div>
        {investor.last30DailyTotalPositionValuesUSD
          .map((v) => formatAs(v, "usd"))
          .join(" → ")}
      </div>
    ),
  },
  {
    key: "cumulativeInteractionsCount",
    label: "Cumulative interactions count",
    render: (investor) => (
      <div>{formatAs(investor.cumulativeInteractionsCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeDepositCount",
    label: "Cumulative deposit count",
    render: (investor) => (
      <div>{formatAs(investor.cumulativeDepositCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeWithdrawCount",
    label: "Cumulative withdraw count",
    render: (investor) => (
      <div>{formatAs(investor.cumulativeWithdrawCount, "count")}</div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (investor) => (
      <AppLinkButton
        as={AppLink}
        to={`/investor/$address`}
        params={{ address: investor.address }}
      >
        👀
      </AppLinkButton>
    ),
  },
] as VaultTableColumnDef[];

function InvestorsTable({ data }: { data: InvestorListQuery["investors"] }) {
  return (
    <SimpleTable
      data={data}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      aria-label="Vaults"
    />
  );
}