import { useQuery } from "urql";
import { VaultStatsDocument } from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import QueryDebug from "../QueryDebug";
import { TokenDataTable } from "../TokenDataTable";
import { TokenBlock } from "../TokenBlock";
import { TransactionBlock } from "../TransactionBlock";
import { VaultAddressesBlock } from "../VaultAddressesBlock";

export function VaultMetrics({ vaultAddress }: { vaultAddress: string }) {
  const [result, _] = useQuery({
    query: VaultStatsDocument,
    variables: {
      vaultAddress,
    },
  });

  if (result.fetching || !result.data || !result.data.vault) {
    return <Spinner size="lg" />;
  }
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-unit-md py-unit-xl">
        <TransactionBlock
          transaction={result.data.vault.createdWith}
          description="Created with"
        />
        <TokenBlock
          token={result.data.vault.sharesToken}
          description="Shares"
        />
        <TokenBlock
          token={result.data.vault.underlyingToken0}
          description="Underlying token 0"
        />
        <TokenBlock
          token={result.data.vault.underlyingToken1}
          description="Underlying token 1"
        />
        <VaultAddressesBlock
          vaultAddresses={result.data.vault}
          description="Addresses"
        />
      </div>
      <QueryDebug query={VaultStatsDocument} result={result.data} />
    </div>
  );
}
