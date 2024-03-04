import { VaultAddressesFragment } from "../../.graphclient";
import { HexDisplay } from "./HexDisplay";

export function VaultAddressesDataTable({
  vaultAddresses,
}: {
  vaultAddresses: VaultAddressesFragment;
}) {
  return (
    <table>
      <tbody>
        <tr>
          <td className="pr-2 text-right text-default-500">Owner</td>
          <td>
            <HexDisplay hexString={vaultAddresses.owner} />
          </td>
        </tr>
        <tr>
          <td className="pr-2 text-right text-default-500">Strategy</td>
          <td>
            <HexDisplay hexString={vaultAddresses.strategy.address} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
