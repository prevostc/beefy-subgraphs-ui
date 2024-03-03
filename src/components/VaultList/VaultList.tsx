import { useQuery } from "urql";
import { VaultListDocument, VaultListQuery } from "../../../.graphclient";
import { Spinner, Tooltip } from "@nextui-org/react";
import QueryDebug from "../QueryDebug";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useCallback } from "react";
import { ts2Date } from "../../utils/timestamp-to-date";

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

function VaultsTable({ data }: { data: VaultListQuery["vaults"] }) {
  const rows = data.map((vault) => ({
    key: vault.id,
    createdWith: `Tx ${vault.createdWith.transactionHash}\n at block ${vault.createdWith.blockNumber} on ${new Date(
      parseInt(vault.createdWith.blockTimestamp, 10) * 1000
    ).toISOString()}`,
  }));

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "sharesToken",
      label: "Shares token",
    },
    {
      key: "underlyingToken0",
      label: "Underlying token 0",
    },
    {
      key: "underlyingToken1",
      label: "Underlying token 1",
    },
    {
      key: "createdWith",
      label: "Created with",
    },
    {
      key: "addresses",
      label: "Addresses",
    },
  ] as const;
  type ColumnKey = (typeof columns)[number]["key"];

  const renderCell = useCallback(
    (vault: (typeof data)[0], columnKey: ColumnKey) => {
      switch (columnKey) {
        case "name":
          return (
            <div className="text-primary-400">{vault.sharesToken.symbol}</div>
          );
        case "createdWith":
          return (
            <table>
              <tbody>
                <tr>
                  <td className="pr-2 text-right">Transaction</td>
                  <td>
                    <HexDisplay hexString={vault.createdWith.transactionHash} />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 text-right">Block</td>
                  <td>{vault.createdWith.blockNumber}</td>
                </tr>
                <tr>
                  <td className="pr-2 text-right">Timestamp</td>
                  <td>
                    {ts2Date(vault.createdWith.blockTimestamp).toISOString()}
                  </td>
                </tr>
              </tbody>
            </table>
          );
        case "sharesToken":
          return <TokenTableCell token={vault.sharesToken} />;
        case "underlyingToken0":
          return <TokenTableCell token={vault.underlyingToken0} />;
        case "underlyingToken1":
          return <TokenTableCell token={vault.underlyingToken1} />;
        case "addresses":
          // owner and strategy
          return (
            <table>
              <tbody>
                <tr>
                  <td className="pr-2 text-right">Owner</td>
                  <td>
                    <HexDisplay hexString={vault.owner} />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 text-right">Strategy</td>
                  <td>
                    <HexDisplay hexString={vault.strategy.address} />
                  </td>
                </tr>
              </tbody>
            </table>
          );
        default:
          return <></>;
      }
    },
    []
  );

  return (
    <Table
      color="warning"
      selectionMode="single"
      defaultSelectedKeys={[]}
      aria-label="Example table with dynamic content"
    >
      <TableHeader columns={columns as any as { key: string; label: string }[]}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as any)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function HexDisplay({ hexString }: { hexString: string }) {
  return (
    <Tooltip
      delay={0}
      closeDelay={0}
      content={<div className="p-3">{hexString}</div>}
    >
      <p>{hexString.slice(0, 20)}...</p>
    </Tooltip>
  );
}

function TokenTableCell({
  token,
}: {
  token: VaultListQuery["vaults"][0]["sharesToken"];
}) {
  return (
    <table>
      <tbody>
        <tr>
          <td className="pr-2 text-right">Address</td>
          <td>
            <Tooltip
              delay={0}
              closeDelay={0}
              content={<div className="p-3">{token.address}</div>}
            >
              <p>{token.address.slice(0, 20)}...</p>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td className="pr-2 text-right">Name</td>
          <td>
            {token.name} ({token.symbol})
          </td>
        </tr>
        <tr>
          <td className="pr-2 text-right">Decimals</td>
          <td>{token.decimals}</td>
        </tr>
      </tbody>
    </table>
  );
}
