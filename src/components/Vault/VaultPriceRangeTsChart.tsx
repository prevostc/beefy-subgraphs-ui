import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { VaultPriceRangeFragment } from "../../../.graphclient";
import { ts2Date } from "../../utils/timestamp-to-date";
import Decimal from "decimal.js";
import { EChartsOption } from "echarts";
import { formatAs } from "../../utils/format-number";
import { Checkbox } from "@nextui-org/react";

export function VaultPriceRangeTsChart({
  ranges,
}: {
  ranges: VaultPriceRangeFragment[];
}) {
  const [yAxisFitData, setYAxisFitData] = useState(false);

  const chartOptions: EChartsOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        position: function (pt) {
          return [pt[0], "10%"];
        } /*
        formatter: function (params) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const value = params[0].data[1] as number;
          const formatted = formatAs(value, selectedConfig.format);
          return `
              <div style="text-align: right;">
                   <b>${selectedConfig.title}</b>
                    </br><hr />
                    <b> ${formatted}</b><br />
                     ${value} <br />
              </div>`;
        },*/,
      },
      xAxis: { type: "time" },
      yAxis: {
        axisLabel: {
          formatter: (v: number) => formatAs(v, "eth"),
        },
        ...(yAxisFitData
          ? {
              min: "dataMin",
              max: "dataMax",
            }
          : {}),
      },
      series: [
        {
          name: "Price Range Low",
          type: "line",
          //stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: ranges.map((r) => [
            ts2Date(r.roundedTimestamp).getTime(),
            new Decimal(r.priceRangeMin1).toNumber(),
          ]),
        },
        {
          name: "Price",
          type: "line",
          //stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: ranges.map((r) => [
            ts2Date(r.roundedTimestamp).getTime(),
            new Decimal(r.currentPriceOfToken0InToken1).toNumber(),
          ]),
        },
        {
          name: "Price Range High",
          type: "line",
          //stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: ranges.map((r) => [
            ts2Date(r.roundedTimestamp).getTime(),
            new Decimal(r.priceRangeMax1).toNumber(),
          ]),
        },
      ],
      legend: {
        data: ["Price Range Low", "Price", "Price Range High"],
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
    [yAxisFitData, ranges]
  );

  return (
    <div className="w-full flex items-stretch flex-col">
      <div className="max-w-full m-auto">
        <div className="flex gap-unit-md">
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
