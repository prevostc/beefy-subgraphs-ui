import { useQuery } from "urql";
import { VaultListDocument, VaultListQuery } from "../../../.graphclient";
import { Button, Spinner } from "@nextui-org/react";
import QueryDebug from "../QueryDebug";
import { ReactNode } from "react";
import { ts2Date } from "../../utils/timestamp-to-date";
import { HexDisplay } from "../HexDisplay";
import { TokenDataTable } from "../TokenDataTable";
import { SimpleTable } from "../SimpleTable/SimpleTable";
import { AppLink } from "../AppLink";
import { AppLinkButton } from "../AppLinkButton";
import { TransactionDataTable } from "../TransactionDataTable";
import { VaultAddressesDataTable } from "../VaultAddressesDataTable";

export function VaultList() {
  const [result, _] = useQuery({
    query: VaultListDocument,
  });

  if (result.fetching || !result.data || !result.data.vaults) {
    return <Spinner size="lg" />;
  }

  return (
    <div>
      <div>
        <VaultsTable data={result.data.vaults} />
      </div>
      <div className="mt-5">
        <QueryDebug query={VaultListDocument} result={result.data.vaults} />
      </div>
    </div>
  );
}

type ColumnDefType<C, R> = {
  key: C;
  label: string;
  render: (row: R) => ReactNode;
};

type ColumnKeys =
  | "name"
  | "sharesToken"
  | "underlyingToken0"
  | "underlyingToken1"
  | "createdWith"
  | "addresses"
  | "actions";
const INITIAL_VISIBLE_COLUMNS: ColumnKeys[] = [
  "name",
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
        to={`/vault/$vaultAddress`}
        params={{ vaultAddress: vault.id }}
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
