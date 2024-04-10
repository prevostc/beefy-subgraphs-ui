import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Snapshot } from "../../.graphclient";
import { ts2Date } from "../utils/timestamp-to-date";
import Decimal from "decimal.js";
import { EChartsOption } from "echarts";
import { NumberFormatMode, formatAs } from "../utils/format-number";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { PERIODS } from "../utils/periods";

type ValidMetric<TKey> = keyof TKey & string;
type StackedLineTimeseriesConfig<TKey> = {
  key: ValidMetric<TKey>;
  format: NumberFormatMode;
};

type Snapshotify<TS> = TS extends Snapshot
  ? Snapshot
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TS extends Pick<infer T, any>
    ? Snapshotify<T>
    : never;

export function StackedLineTimeseries<TRow extends Snapshot>({
  dataSets,
  config,
  period,
  onPeriodChange,
}: {
  dataSets: { name: string; values: Snapshotify<TRow>[] }[];
  config: StackedLineTimeseriesConfig<TRow>[];
  period: number;
  onPeriodChange: (period: number) => void;
}) {
  const configWithTitle = useMemo(
    () =>
      config.map((c) => ({
        ...c,
        title: c.key
          .split(/(?=[A-Z])/)
          .join(" ")
          .replace("U S D", "USD")
          .replace(/^./, (str) => str.toUpperCase()),
      })),
    [config]
  );
  const [yAxisFitData, setYAxisFitData] = useState(false);
  const [stackSeries, setStackSeries] = useState(true);
  const [selectedConfig, setSelectedConfig] = useState(configWithTitle[0]);

  const handleSelectionChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        const selected = configWithTitle.find((c) => c.key === e.target.value);
        if (selected) {
          setSelectedConfig(selected);
        }
      },
      [setSelectedConfig, configWithTitle]
    );

  const handlePeriodChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      onPeriodChange(parseInt(e.target.value));
    },
    [onPeriodChange]
  );

  const series = useMemo((): EChartsOption["series"] => {
    let timeseries = dataSets.map(({ name, values: snapshots }) => {
      const ts = snapshots.map((snapshot) => {
        // @ts-expect-error snapshot type TRow is not type linked to config
        const value = snapshot[selectedConfig.key];
        return [
          ts2Date(snapshot.roundedTimestamp).getTime(),
          new Decimal(value).toNumber(),
        ];
      });
      // sort by date
      ts.sort((a, b) => a[0] - b[0]);
      return { name, ts };
    });

    // adapt ts so they have the same length and are aligned by date
    const tss = timeseries.map(({ ts }) => ts);
    const alignedTss = timeseries.map(() => [] as number[][]);
    let maxIter = 1000000;
    while (tss.some((ts) => ts.length > 0) && maxIter-- > 0) {
      // find the minimum date
      const minDate = Math.min(
        ...tss.map((ts) => (ts.length > 0 ? ts[0][0] : Infinity))
      );
      // add the values to the alignedTs
      tss.forEach((ts, i) => {
        const alignedTs = alignedTss[i];
        if (ts.length > 0 && ts[0][0] === minDate) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          alignedTs.push([minDate, (ts.shift() as number[])[1] as any]);
        } else {
          // find the previous value

          alignedTs.push([
            minDate,
            i === 0
              ? 0
              : alignedTs.length > 1
                ? alignedTs[alignedTs.length - 1][1]
                : 0,
          ]);
        }
      });
    }

    timeseries = timeseries.map(({ name }, i) => ({
      ts: alignedTss[i],
      name,
    }));
    console.log(timeseries);

    return timeseries.map(({ name, ts }) => {
      return {
        name: name,
        type: "line",
        stack: stackSeries ? "Total" : undefined,
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: ts,
      };
    });
  }, [dataSets, selectedConfig.key, stackSeries]);

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
        // formatter: function (params) {
        //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   // @ts-ignore
        //   const value = params[0].data[1] as number;
        //   const formatted = formatAs(value, selectedConfig.format);
        //   return `
        //       <div style="text-align: right;">
        //            <b>${selectedConfig.title}</b>
        //             </br><hr />
        //             <b> ${formatted}</b><br />
        //              ${value} <br />
        //       </div>`;
        // },
      },
      xAxis: { type: "time" },
      yAxis: {
        axisLabel: {
          formatter: (v: number) => formatAs(v, selectedConfig.format),
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
        data: dataSets.map((d) => d.name),
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
    [series, selectedConfig, yAxisFitData, dataSets]
  );

  return (
    <div className="w-full flex items-stretch flex-col">
      <div className="max-w-full m-auto">
        <div className="flex gap-unit-md">
          <Select
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selectedKeys={[selectedConfig.key] as any}
            selectionMode="single"
            onChange={handleSelectionChange}
            label="Timeserie type"
            placeholder="Select a metric"
            className="max-w-xs sm:min-w-unit-6xl"
            color="warning"
            variant="bordered"
          >
            {configWithTitle.map(({ key, title }) => (
              <SelectItem key={key} value={key}>
                {title}
              </SelectItem>
            ))}
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
          <div className="w-unit-4xl flex flex-col items-center justify-center">
            <Checkbox isSelected={stackSeries} onValueChange={setStackSeries}>
              Stack
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
