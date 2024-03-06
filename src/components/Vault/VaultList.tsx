import { useQuery } from "urql";
import { VaultListDocument, VaultListQuery } from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { ReactNode } from "react";
import { TokenDataTable } from "../TokenDataTable";
import { ColumnDefType, SimpleTable } from "../SimpleTable";
import { AppLink } from "../AppLink";
import { AppLinkButton } from "../AppLinkButton";
import { TransactionDataTable } from "../TransactionDataTable";
import { VaultAddressesDataTable } from "../VaultAddressesDataTable";
import { PageBody } from "../PageBody";
import { Section } from "../Section";
import { Query } from "../../../.graphclient/index";
import { formatAs } from "../../utils/format-number";

export function VaultList() {
  const [result, _] = useQuery({
    query: VaultListDocument,
  });

  if (result.fetching || !result.data || !result.data.vaults) {
    return <Spinner size="lg" />;
  }

  return (
    <PageBody>
      <Section.Title>Vaults</Section.Title>
      <Section.Body>
        <VaultsTable data={result.data.vaults} />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={VaultListDocument} result={result.data.vaults} />
      </Section.Body>
    </PageBody>
  );
}

type ColumnKeys =
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
type VaultTableColumnDef = ColumnDefType<
  ColumnKeys,
  VaultListQuery["vaults"][0]
>;

const columns = [
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
        to={`/vault/$address`}
        params={{ address: vault.id }}
      >
        👀
      </AppLinkButton>
    ),
  },
] as VaultTableColumnDef[];

function VaultsTable({ data }: { data: VaultListQuery["vaults"] }) {
  return (
    <SimpleTable
      data={data}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      aria-label="Vaults"
    />
  );
}
