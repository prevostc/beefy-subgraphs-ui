import { TokenFragment } from "../../.graphclient";
import { HexDisplay } from "./HexDisplay";

export function TokenDataTable({ token }: { token: TokenFragment }) {
  return (
    <table>
      <tbody>
        <tr>
          <td className="pr-2 text-right text-default-500">Address</td>
          <td className="text-left">
            <HexDisplay hexString={token.address} />
          </td>
        </tr>
        <tr>
          <td className="pr-2 text-right text-default-500">Name</td>
          <td className="text-left">{token.name}</td>
        </tr>
        <tr>
          <td className="pr-2 text-right text-default-500">Symbol</td>
          <td className="text-left">{token.symbol}</td>
        </tr>
        <tr>
          <td className="pr-2 text-right text-default-500">Decimals</td>
          <td className="text-left">{token.decimals}</td>
        </tr>
      </tbody>
    </table>
  );
}
