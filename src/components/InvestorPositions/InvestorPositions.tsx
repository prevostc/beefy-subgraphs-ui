import { useQuery } from "urql";
import {
  InvestorPositionsDocument,
  VaultStatsDocument,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { InvestorMetrics } from "./InvestorMetrics";
import { Section } from "../Section";
import { InvestorPositionsTable } from "./InvestorPositionsTable";
import Decimal from "decimal.js";
import { SimpleDailyTsChart } from "../SimpleDailyTsChart";

export function InvestorPositions({ address }: { address: string }) {
  const [result, _] = useQuery({
    query: InvestorPositionsDocument,
    variables: {
      address,
    },
  });

  if (result.fetching || !result.data || !result.data.investor) {
    return <Spinner size="lg" />;
  }

  return (
    <div className="max-w-[1024px] m-auto">
      <InvestorMetrics investor={result.data.investor} />
      <Section.Title>Positions</Section.Title>
      <Section.Body>
        <InvestorPositionsTable data={result.data.investor.positions} />
      </Section.Body>
      <Section.Title>Last 30 days Wallet value</Section.Title>
      <Section.Body>
        <SimpleDailyTsChart
          data={result.data.investor.last30DailyTotalPositionValuesUSD.map(
            (v) => new Decimal(v).toNumber()
          )}
        />
      </Section.Body>

      <QueryDebug query={VaultStatsDocument} result={result.data} />
    </div>
  );
}
