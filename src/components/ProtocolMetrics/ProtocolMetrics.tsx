import { useQuery } from "urql";
import { ProtocolStatsDocument } from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import Metric from "../NumericMetric";
import QueryDebug from "../QueryDebug";

export function ProtocolMetrics() {
  const [result, _] = useQuery({
    query: ProtocolStatsDocument,
  });

  if (result.fetching || !result.data || !result.data.protocol) {
    return <Spinner size="lg" />;
  }
  const protocol = result.data.protocol;
  return (
    <div>
      <div className="w-full flex flex-wrap justify-evenly gap-5 lg:gap-0 lg:justify-between">
        <Metric
          description="Beefy ALM TVL"
          mode="usd"
          value={protocol.totalValueLockedUSD}
        />
        <Metric
          description="Active Vaults"
          mode="count"
          value={protocol.activeVaultCount}
        />
        <Metric
          description="Harvest Count"
          mode="count"
          value={protocol.harvestCount}
        />
        <Metric
          description="Trx Count"
          mode="count"
          value={protocol.transactionCount}
        />
      </div>
      <div className="mt-5">
        <QueryDebug query={ProtocolStatsDocument} result={result.data} />
      </div>
    </div>
  );
}
