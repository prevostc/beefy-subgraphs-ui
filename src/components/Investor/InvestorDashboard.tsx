import { useQuery } from "@tanstack/react-query";
import {
  InvestorFragment,
  InvestorSnapshotFragment,
  getBuiltGraphSDK,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { InvestorMetrics } from "./InvestorMetrics";
import { Section } from "../Section";
import { InvestorPositionsTable } from "./Position/InvestorPositionsTable";
import { InvestorDashboardDocument } from "../../../.graphclient/index";
import { StackedLineTimeseries } from "../StackedLineTimeseries";
import { PageBody } from "../PageBody";
import { allChains } from "../../utils/chains";
import { InvestorPositionInteractionTable } from "./Position/InvestorPositionInteractionTable";
import { PERIODS } from "../../utils/periods";
import { useState } from "react";

const sdk = getBuiltGraphSDK();
const createFetchData = (address: string, period: number) => async () => {
  const results = await Promise.all(
    allChains.map((chain) =>
      sdk
        .InvestorDashboard({ address, period }, { chainName: chain })
        .then((data) => ({ ...data, chain }))
    )
  );

  return results;
};

export function InvestorDashboard({ address }: { address: string }) {
  const [period, setPeriod] = useState(PERIODS[1].key);
  const {
    isPending,
    error,
    data: rawData,
  } = useQuery({
    queryKey: ["investorDashboard", { address, period }],
    queryFn: createFetchData(address, period),
  });

  if (isPending) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  const data = rawData.filter(
    (
      c
    ): c is typeof c & {
      investor: NonNullable<(typeof c)["investor"]>;
    } => !!c.investor
  );

  return (
    <PageBody>
      <InvestorMetrics
        investor={data.map((c) => ({
          chain: c.chain,
          ...(c.investor || ({ id: address } as InvestorFragment)),
        }))}
      />
      <Section.Title>Positions</Section.Title>
      <Section.Body>
        <InvestorPositionsTable
          data={data
            .map((c) =>
              c.investor.positions.map((i) => ({ chain: c.chain, ...i }))
            )
            .flat()}
        />
      </Section.Body>

      <Section.Title>Interactions</Section.Title>
      <Section.Body>
        <InvestorPositionInteractionTable
          data={data
            .map((c) =>
              c.investor.interactions.map((i) => ({ ...i, chain: c.chain }))
            )
            .flat()}
        />
      </Section.Body>

      <Section.Title>Snapshots</Section.Title>
      <Section.Body>
        <StackedLineTimeseries<InvestorSnapshotFragment>
          period={period}
          onPeriodChange={setPeriod}
          dataSets={data.map((d) => ({
            name: d.chain,
            values: d.investor.snapshots,
          }))}
          config={[
            { key: "totalPositionValueUSD", format: "usd" },
            { key: "interactionsCount", format: "count" },
            { key: "depositCount", format: "count" },
            { key: "withdrawCount", format: "count" },
            { key: "compoundedValueUSD", format: "usd" },
          ]}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={InvestorDashboardDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}
