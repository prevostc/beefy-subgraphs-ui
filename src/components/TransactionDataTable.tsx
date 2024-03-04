import { TransactionFragment } from "../../.graphclient";
import { ts2Date } from "../utils/timestamp-to-date";
import { HexDisplay } from "./HexDisplay";

export function TransactionDataTable({
  transaction,
}: {
  transaction: TransactionFragment;
}) {
  return (
    <table>
      <tbody>
        <tr>
          <td className="pr-2 text-right text-default-500">Transaction</td>
          <td className="text-left">
            <HexDisplay hexString={transaction.transactionHash} />
          </td>
        </tr>
        <tr>
          <td className="pr-2 text-right text-default-500">Block</td>
          <td className="text-left">{transaction.blockNumber}</td>
        </tr>
        <tr>
          <td className="pr-2 text-right text-default-500">Timestamp</td>
          <td className="text-left">
            {ts2Date(transaction.blockTimestamp).toISOString()}
          </td>
        </tr>
        <tr>
          <td className="pr-2 text-right text-default-500">From</td>
          <td className="text-left">
            <HexDisplay hexString={transaction.sender.address} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
