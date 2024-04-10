import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { ColumnDefType, SimpleTable } from "../SimpleTable";
import { AppLink } from "../AppLink";
import { AppLinkButton } from "../AppLinkButton";
import {
  InvestorListDocument,
  InvestorListQuery,
  getBuiltGraphSDK,
} from "../../../.graphclient";
import { HexDisplay } from "../HexDisplay";
import { formatAs } from "../../utils/format-number";
import { allChains } from "../../utils/chains";

const sdk = getBuiltGraphSDK();
const fetchData = async () => {
  const results = await Promise.all(
    allChains.map((chain) =>
      sdk
        .InvestorList({}, { chainName: chain })
        .then((data) => ({ ...data, chain }))
    )
  );

  return results;
};

export function InvestorsList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["investorList"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <div>
      <div>
        <InvestorsTable
          data={data
            .map((c) => c.investors.map((i) => ({ chain: c.chain, ...i })))
            .flat()}
        />
      </div>
      <div className="mt-5">
        <QueryDebug query={InvestorListDocument} result={data} />
      </div>
    </div>
  );
}

type RowType = InvestorListQuery["investors"][0] & { chain: string };

type ColumnKeys =
  | "chain"
  | "address"
  | "closedInvestmentDuration"
  | "currentInvestmentOpenAtTimestamp"
  | "activePositionCount"
  | "totalPositionValueUSD"
  | "averageDailyTotalPositionValueUSD30D"
  | "cumulativeInteractionsCount"
  | "cumulativeDepositCount"
  | "cumulativeWithdrawCount"
  | "cumulativeCompoundedValueUSD"
  | "actions";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "chain",
  "address",
  "currentInvestmentOpenAtTimestamp",
  "activePositionCount",
  "totalPositionValueUSD",
  "averageDailyTotalPositionValueUSD30D",
  "cumulativeInteractionsCount",
  "cumulativeDepositCount",
  "cumulativeWithdrawCount",
  "cumulativeCompoundedValueUSD",
  "actions",
];
type VaultTableColumnDef = ColumnDefType<ColumnKeys, RowType>;

const columns = [
  {
    key: "chain",
    label: "Chain",
    render: (vault) => <div>{vault.chain}</div>,
  },
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
    key: "cumulativeCompoundedValueUSD",
    label: "Cumulative Compounded value USD",
    render: (investor) => (
      <div>{formatAs(investor.cumulativeCompoundedValueUSD, "usd")}</div>
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

function InvestorsTable({ data }: { data: RowType[] }) {
  return (
    <SimpleTable
      data={data}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      aria-label="Vaults"
    />
  );
}
