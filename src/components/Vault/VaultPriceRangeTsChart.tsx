import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { VaultPriceRangeFragment } from "../../../.graphclient";
import { ts2Date } from "../../utils/timestamp-to-date";
import Decimal from "decimal.js";
import { EChartsOption } from "echarts";
import { formatAs } from "../../utils/format-number";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { PERIODS } from "../../utils/periods";

export function VaultPriceRangeTsChart({
  ranges,
  period,
  onPeriodChange,
}: {
  ranges: VaultPriceRangeFragment[];
  period: number;
  onPeriodChange: (period: number) => void;
}) {
  const [yAxisFitData, setYAxisFitData] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"usd" | "token">("token");

  const handleSelectionChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        setSelectedMode(e.target.value as "usd" | "token");
      },
      [setSelectedMode]
    );

  const handlePeriodChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      onPeriodChange(parseInt(e.target.value, 10));
    },
    [onPeriodChange]
  );

  const series = useMemo((): EChartsOption["series"] => {
    // sort ranges by timestamp asc
    ranges.sort((a, b) => a.roundedTimestamp - b.roundedTimestamp);
    return selectedMode === "usd"
      ? [
          {
            name: "Price Range Low (in USD)",
            type: "line",
            data: ranges.map((r) => [
              ts2Date(r.roundedTimestamp).getTime(),
              new Decimal(r.priceRangeMinUSD).toNumber(),
            ]),
          },
          {
            name: "Price",
            type: "line",
            data: ranges.map((r) => [
              ts2Date(r.roundedTimestamp).getTime(),
              new Decimal(r.currentPriceOfToken0InUSD).toNumber(),
            ]),
          },
          {
            name: "Price Range High",
            type: "line",
            data: ranges.map((r) => [
              ts2Date(r.roundedTimestamp).getTime(),
              new Decimal(r.priceRangeMaxUSD).toNumber(),
            ]),
          },
        ]
      : [
          {
            name: "Price Range Low (in token 1)",
            type: "line",
            data: ranges.map((r) => [
              ts2Date(r.roundedTimestamp).getTime(),
              new Decimal(r.priceRangeMin1).toNumber(),
            ]),
          },
          {
            name: "Price (in token 1)",
            type: "line",
            data: ranges.map((r) => [
              ts2Date(r.roundedTimestamp).getTime(),
              new Decimal(r.currentPriceOfToken0InToken1).toNumber(),
            ]),
          },
          {
            name: "Price Range High (in token 1)",
            type: "line",
            data: ranges.map((r) => [
              ts2Date(r.roundedTimestamp).getTime(),
              new Decimal(r.priceRangeMax1).toNumber(),
            ]),
          },
        ];
  }, [ranges, selectedMode]);

  const chartOptions: EChartsOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      xAxis: { type: "time" },
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: (v: number) =>
            formatAs(v, selectedMode === "usd" ? "usd" : "float"),
        },
        ...(yAxisFitData
          ? {
              min: "dataMin",
              max: "dataMax",
            }
          : {}),
      },
      series: series,
      legend: {
        top: "bottom",
        bottom: 0,
        textStyle: {
          color: "#fff",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
    }),
    [series, yAxisFitData, selectedMode]
  );

  return (
    <div className="w-full flex items-stretch flex-col">
      <div className="max-w-full m-auto">
        <div className="flex gap-unit-md">
          <Select
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selectedKeys={[selectedMode] as any}
            selectionMode="single"
            onChange={handleSelectionChange}
            label="Timeserie type"
            placeholder="Select a metric"
            className="max-w-xs sm:min-w-unit-6xl"
            color="warning"
            variant="bordered"
          >
            <SelectItem key={"usd"} value={"usd"}>
              USD
            </SelectItem>
            <SelectItem key={"token"} value={"token"}>
              Token 1
            </SelectItem>
          </Select>
          <Select
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selectedKeys={[period + ""] as any}
            selectionMode="single"
            onChange={handlePeriodChange}
            label="Period"
            placeholder="Select a period"
            className="max-w-xs sm:min-w-unit-2xl"
            color="secondary"
            variant="bordered"
          >
            {PERIODS.map(({ key, title }) => (
              <SelectItem key={key + ""} value={key}>
                {title}
              </SelectItem>
            ))}
          </Select>
          <div className="w-unit-4xl flex flex-col items-center justify-center">
            <Checkbox isSelected={yAxisFitData} onValueChange={setYAxisFitData}>
              Fit Data
            </Checkbox>
          </div>
        </div>
      </div>
      <div>
        <ReactECharts
          style={{ height: "500px", width: "100%", maxWidth: "100%" }}
          option={chartOptions}
        />
      </div>
    </div>
  );
}
