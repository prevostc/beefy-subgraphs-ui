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
        .VaultList(
          {},
          {
            chainName: chain,
          }
        )
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
  | "totalValueLockedUSD"
  | "cumulativeHarvestCount"
  | "cumulativeDepositCount"
  | "cumulativeWithdrawCount"
  | "cumulativeTransferCount"
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
    label: "TVL",
    render: (vault) => <div>{formatAs(vault.totalValueLockedUSD, "usd")}</div>,
  },
  {
    key: "cumulativeHarvestCount",
    label: "Harvests",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeHarvestCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeDepositCount",
    label: "Deposits",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeDepositCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeWithdrawCount",
    label: "Withdraws",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeWithdrawCount, "count")}</div>
    ),
  },
  {
    key: "cumulativeTransferCount",
    label: "Transfers",
    render: (vault) => (
      <div>{formatAs(vault.cumulativeTransferCount, "count")}</div>
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
