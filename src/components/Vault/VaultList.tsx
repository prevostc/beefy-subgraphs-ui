import { useQuery } from "@tanstack/react-query";
import {
  VaultListDocument,
  VaultListQuery,
  getBuiltGraphSDK,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { TokenDataTable } from "../TokenDataTable";
import { ColumnDefType, SimpleTable } from "../SimpleTable";
import { AppLink } from "../AppLink";
import { AppLinkButton } from "../AppLinkButton";
import { TransactionDataTable } from "../TransactionDataTable";
import { VaultAddressesDataTable } from "../VaultAddressesDataTable";
import { PageBody } from "../PageBody";
import { Section } from "../Section";
import { formatAs } from "../../utils/format-number";
import { allChains } from "../../utils/chains";

const sdk = getBuiltGraphSDK();
const fetchData = async () => {
  const results = await Promise.all(
    allChains.map((chain) =>
      sdk
        .VaultList({}, { chainName: chain })
        .then((data) => ({ ...data, chain }))
    )
  );

  return results;
};

export function VaultList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["vaultList"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <PageBody>
      <Section.Title>Vaults</Section.Title>
      <Section.Body>
        <VaultsTable
          data={data
            .map((c) => c.vaults.map((v) => ({ chain: c.chain, ...v })))
            .flat()}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={VaultListDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}

type RowType = VaultListQuery["vaults"][0] & { chain: string };

type ColumnKeys =
  | "chain"
  | "name"
  | "currentPriceOfToken0InToken1"
  | "currentPriceOfToken0InUSD"
  | "priceRangeMin1"
  | "priceRangeMax1"
  | "priceRangeMinUSD"
  | "priceRangeMaxUSD"
  | "underlyingAmount0"
  | "underlyingAmount1"
  | "underlyingAmount0USD"
  | "underlyingAmount1USD"
  | "totalValueLockedUSD"
  | "cumulativeHarvestCount"
  | "cumulativeDepositCount"
  | "cumulativeWithdrawCount"
  | "cumulativeTransferCount"
  | "cumulativeCompoundedAmount0"
  | "cumulativeCompoundedAmount1"
  | "cumulativeCompoundedAmount0USD"
  | "cumulativeCompoundedAmount1USD"
  | "cumulativeCompoundedValueUSD"
  | "cumulativeHarvesterFeeCollectedNative"
  | "cumulativeProtocolFeeCollectedNative"
  | "cumulativeStrategistFeeCollectedNative"
  | "cumulativeHarvesterFeeCollectedUSD"
  | "cumulativeProtocolFeeCollectedUSD"
  | "cumulativeStrategistFeeCollectedUSD"
  | "lastCollectedFeeTimestamp"
  | "aprState"
  | "apr1D"
  | "apr7D"
  | "apr30D"
  | "sharesToken"
  | "underlyingToken0"
  | "underlyingToken1"
  | "createdWith"
  | "addresses"
  | "actions";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "chain",
  "name",
  "totalValueLockedUSD",
  "apr1D",
  "apr7D",
  "apr30D",
  "cumulativeHarvestCount",
  "cumulativeDepositCount",
  "cumulativeWithdrawCount",
  "cumulativeTransferCount",
  "sharesToken",
  "createdWith",
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
    key: "name",
    label: "Name",
    render: (vault) => <div>{vault.sharesToken.symbol}</div>,
  },
  {
    key: "totalValueLockedUSD",
    label: "Total Value Locked (in USD)",
    render: (vault) => <div>{formatAs(vault.totalValueLockedUSD, "usd")}</div>,
  },
  {
    key: "aprState",
    label: "APR State",
    render: (vault) => (
      <div>{vault.aprState.map((d) => d.toString()).join("\n")}</div>
    ),
  },
  {
    key: "apr1D",
    label: "APR 1D",
    render: (vault) => <div>{formatAs(vault.apr1D, "percent")}</div>,
  },
  {
    key: "apr7D",
    label: "APR 7D",
    render: (vault) => <div>{formatAs(vault.apr7D, "percent")}</div>,
  },
  {
    key: "apr30D",
    label: "APR 30D",
    render: (vault) => <div>{formatAs(vault.apr30D, "percent")}</div>,
  },
  {
    key: "cumulativeHarvestCount",
    label: "Cumulative Harvest Count",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeHarvestCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeDepositCount",
    label: "Cumulative Deposit Count",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeDepositCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeWithdrawCount",
    label: "Cumulative Withdraw Count",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeWithdrawCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeTransferCount",
    label: "Cumulative Transfer Count",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeTransferCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeCompoundedAmount0",
    label: "Cumulative Compounded token 0",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeCompoundedAmount0, "count")}</div>
    ),
  },
  {
    key: "cumulativeCompoundedAmount1",
    label: "Cumulative Compounded token 1",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeCompoundedAmount1, "count")}</div>
    ),
  },
  {
    key: "cumulativeCompoundedAmount0USD",
    label: "Cumulative Compounded token 0 (in USD)",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeCompoundedAmount0USD, "usd")}</div>
    ),
  },
  {
    key: "cumulativeCompoundedAmount1USD",
    label: "Cumulative Compounded token 1 (in USD)",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeCompoundedAmount1USD, "usd")}</div>
    ),
  },
  {
    key: "cumulativeCompoundedValueUSD",
    label: "Cumulative Compounded (in USD)",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeCompoundedValueUSD, "usd")}</div>
    ),
  },
  {
    key: "cumulativeHarvesterFeeCollectedNative",
    label: "Cumulative Harvester Fee Collected (Native)",
    render: (vault) => (
      <div>
        {formatAs(vault.cumulativeHarvesterFeeCollectedNative, "count")}
      </div>
    ),
  },
  {
    key: "cumulativeProtocolFeeCollectedNative",
    label: "Cumulative Protocol Fee Collected (Native)",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeProtocolFeeCollectedNative, "count")}</div>
    ),
  },
  {
    key: "cumulativeStrategistFeeCollectedNative",
    label: "Cumulative Strategist Fee Collected (Native)",
    render: (vault) => (
      <div>
        {formatAs(vault.cumulativeStrategistFeeCollectedNative, "count")}
      </div>
    ),
  },
  {
    key: "cumulativeHarvesterFeeCollectedUSD",
    label: "Cumulative Harvester Fee Collected (in USD)",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeHarvesterFeeCollectedUSD, "usd")}</div>
    ),
  },
  {
    key: "cumulativeProtocolFeeCollectedUSD",
    label: "Cumulative Protocol Fee Collected (in USD)",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeProtocolFeeCollectedUSD, "usd")}</div>
    ),
  },
  {
    key: "cumulativeStrategistFeeCollectedUSD",
    label: "Cumulative Strategist Fee Collected (in USD)",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeStrategistFeeCollectedUSD, "usd")}</div>
    ),
  },
  {
    key: "sharesToken",
    label: "Shares token",
    render: (vault) => <TokenDataTable token={vault.sharesToken} />,
  },
  {
    key: "underlyingToken0",
    label: "Underlying token 0",
    render: (vault) => <TokenDataTable token={vault.underlyingToken0} />,
  },
  {
    key: "underlyingToken1",
    label: "Underlying token 1",
    render: (vault) => <TokenDataTable token={vault.underlyingToken1} />,
  },
  {
    key: "createdWith",
    label: "Created with",
    render: (vault) => <TransactionDataTable transaction={vault.createdWith} />,
  },
  {
    key: "addresses",
    label: "Addresses",
    render: (vault) => <VaultAddressesDataTable vaultAddresses={vault} />,
  },
  {
    key: "actions",
    label: "Actions",
    render: (vault) => (
      <AppLinkButton
        as={AppLink}
        to={`/vault/$chain/$address`}
        params={{ chain: vault.chain, address: vault.id }}
      >
        👀
      </AppLinkButton>
    ),
  },
] as VaultTableColumnDef[];

function VaultsTable({ data }: { data: RowType[] }) {
  return (
    <SimpleTable
      data={data}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      aria-label="Vaults"
    />
  );
}
