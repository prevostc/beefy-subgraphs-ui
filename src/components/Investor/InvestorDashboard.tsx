import { useQuery } from "@tanstack/react-query";
import {
  InvestorFragment,
  InvestorSnapshotFragment,
  Snapshot,
  getBuiltGraphSDK,
} from "../../../.graphclient";
import { Spinner } from "@nextui-org/react";
import { QueryDebug } from "../QueryDebug";
import { InvestorMetrics } from "./InvestorMetrics";
import { Section } from "../Section";
import { InvestorPositionsTable } from "./Position/InvestorPositionsTable";
import Decimal from "decimal.js";
import { InvestorDashboardDocument } from "../../../.graphclient/index";
import { StackedLineTimeseries } from "../StackedLineTimeseries";
import { PageBody } from "../PageBody";
import { allChains } from "../../utils/chains";

const sdk = getBuiltGraphSDK();
const createFetchData = (address: string) => async () => {
  const results = await Promise.all(
    allChains.map((chain) =>
      sdk
        .InvestorDashboard({ address }, { chainName: chain })
        .then((data) => ({ ...data, chain }))
    )
  );

  return results;
};

export function InvestorDashboard({ address }: { address: string }) {
  const {
    isPending,
    error,
    data: rawData,
  } = useQuery({
    queryKey: ["investorDashboard"],
    queryFn: createFetchData(address),
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

      <Section.Title>Last 30 days Wallet value</Section.Title>
      <Section.Body>
        <StackedLineTimeseries<
          {
            dailyTotalPositionValue: number;
          } & Snapshot
        >
          dataSets={data.map((c) => ({
            name: c.chain,
            values: c.investor.last30DailyTotalPositionValuesUSD.map(
              (v, i) => ({
                period: 0,
                roundedTimestamp:
                  new Date().getTime() -
                  (c.investor.last30DailyTotalPositionValuesUSD.length - i) *
                    86400000,
                timestamp:
                  new Date().getTime() -
                  (c.investor.last30DailyTotalPositionValuesUSD.length - i) *
                    86400000,
                dailyTotalPositionValue: new Decimal(v).toNumber(),
              })
            ),
          }))}
          config={[
            {
              key: "dailyTotalPositionValue",
              format: "usd",
            },
          ]}
        />
      </Section.Body>

      <Section.Title>Timeseries</Section.Title>
      <Section.Body>
        <StackedLineTimeseries<InvestorSnapshotFragment>
          dataSets={data.map((d) => ({
            name: d.chain,
            values: d.investor.dailySnapshots,
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
