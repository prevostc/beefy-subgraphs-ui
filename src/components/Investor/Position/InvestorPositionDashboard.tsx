import { useQuery } from "@tanstack/react-query";
import {
  InvestorPositionDashboardDocument,
  InvestorPositionSnapshotFragment,
  getBuiltGraphSDK,
} from "../../../../.graphclient";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import { QueryDebug } from "../../QueryDebug";
import { StackedLineTimeseries } from "../../StackedLineTimeseries";
import { Section } from "../../Section";
import { Metric } from "../../Metric";
import { AppLink } from "../../AppLink";
import { HexDisplay } from "../../HexDisplay";
import { PageBody } from "../../PageBody";
import { InvestorPositionInteractionTable } from "./InvestorPositionInteractionTable";
import { useState } from "react";
import { PERIODS } from "../../../utils/periods";

const sdk = getBuiltGraphSDK();
const createFetchData =
  (chain: string, id: string, period: number) => async () => {
    return sdk
      .InvestorPositionDashboard({ id, period }, { chainName: chain })
      .then((data) => ({ ...data, chain }));
  };

export function InvestorPositionDashboard({
  chain,
  id,
}: {
  chain: string;
  id: string;
}) {
  const [period, setPeriod] = useState(PERIODS[1].key);
  const { isPending, error, data } = useQuery({
    queryKey: ["investorPositionDashboard", { id, period }],
    queryFn: createFetchData(chain, id, period),
  });

  if (isPending) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  if (!data || !data.investorPosition) {
    return <pre>Error: No data</pre>;
  }

  return (
    <PageBody>
      <Section.Title>Position</Section.Title>
      <Breadcrumbs>
        <BreadcrumbItem>Vault</BreadcrumbItem>
        <BreadcrumbItem>
          <AppLink
            to={"/vault/$chain/$address"}
            params={{ chain, address: data.investorPosition.vault.address }}
          >
            {data.investorPosition.vault.sharesToken.name}
          </AppLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Investor</BreadcrumbItem>
        <BreadcrumbItem>
          <AppLink
            to={"/investor/$address"}
            params={{ address: data.investorPosition.investor.address }}
          >
            <HexDisplay
              hexString={data.investorPosition.investor.address}
              showChars={20}
            />
          </AppLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Position</BreadcrumbItem>
      </Breadcrumbs>

      <Section.Metrics>
        <Metric
          value={data.investorPosition.closedPositionDuration}
          description="Closed Position Duration"
          mode="duration"
        />
        <Metric
          value={data.investorPosition.positionOpenAtTimestamp}
          description="Position Open At"
          mode="date"
        />
        <Metric
          value={data.investorPosition.sharesBalance}
          description="Shares"
          mode="count"
        />
        <Metric
          value={data.investorPosition.initialUnderlyingBalance0}
          description="Initial Underlying balance 0"
          mode="count"
        />
        <Metric
          value={data.investorPosition.initialUnderlyingBalance1}
          description="Initial Underlying balance 1"
          mode="count"
        />
        <Metric
          value={data.investorPosition.initialUnderlyingBalance0USD}
          description="Initial Underlying balance 0 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.initialUnderlyingBalance1USD}
          description="Initial Underlying balance 1 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.underlyingBalance0}
          description="Underlying balance 0"
          mode="count"
        />
        <Metric
          value={data.investorPosition.underlyingBalance1}
          description="Underlying balance 1"
          mode="count"
        />
        <Metric
          value={data.investorPosition.underlyingBalance0USD}
          description="Underlying balance 0 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.underlyingBalance1USD}
          description="Underlying balance 1 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.positionValueUSD}
          description="Position value USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.averageDailyPositionValueUSD30D}
          description="Average daily position value USD 30D"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedAmount0}
          description="Cumulative Compounded Amount 0"
          mode="count"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedAmount1}
          description="Cumulative Compounded Amount 1"
          mode="count"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedAmount0USD}
          description="Cumulative Compounded Amount 0 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedAmount1USD}
          description="Cumulative Compounded Amount 1 USD"
          mode="usd"
        />
        <Metric
          value={data.investorPosition.cumulativeCompoundedValueUSD}
          description="Cumulative Compounded Value USD"
          mode="usd"
        />
      </Section.Metrics>

      <Section.Title>Interactions</Section.Title>
      <Section.Body>
        <InvestorPositionInteractionTable
          data={data.investorPosition.interactions.map((i) => ({
            ...i,
            chain,
          }))}
        />
      </Section.Body>

      <Section.Title>Snapshots</Section.Title>
      <Section.Body>
        <StackedLineTimeseries<InvestorPositionSnapshotFragment>
          period={period}
          onPeriodChange={setPeriod}
          dataSets={[{ name: chain, values: data.investorPosition.snapshots }]}
          config={[
            { key: "sharesBalance", format: "float" },
            { key: "underlyingBalance0", format: "float" },
            { key: "underlyingBalance1", format: "float" },
            { key: "underlyingBalance0USD", format: "usd" },
            { key: "underlyingBalance1USD", format: "usd" },
            { key: "positionValueUSD", format: "usd" },
            { key: "compoundedAmount0", format: "float" },
            { key: "compoundedAmount1", format: "float" },
            { key: "compoundedAmount0USD", format: "usd" },
            { key: "compoundedAmount1USD", format: "usd" },
            { key: "compoundedValueUSD", format: "usd" },
          ]}
        />
      </Section.Body>

      <Section.Title>Query</Section.Title>
      <Section.Body>
        <QueryDebug query={InvestorPositionDashboardDocument} result={data} />
      </Section.Body>
    </PageBody>
  );
}
