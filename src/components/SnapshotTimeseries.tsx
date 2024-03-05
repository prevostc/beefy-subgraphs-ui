import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Snapshot } from "../../.graphclient";
import { ts2Date } from "../utils/timestamp-to-date";
import Decimal from "decimal.js";
import { EChartsOption } from "echarts";
import { formatAs } from "../utils/format-number";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";

type ValidMetric<TKey> = keyof TKey & string;
export type SnapshotTimeseriesConfig<TKey> = {
  key: ValidMetric<TKey>;
  //title: string;
  format: "usd" | "eth" | "count";
};

type Snapshotify<TS> = TS extends Snapshot
  ? Snapshot
  : TS extends Pick<infer T, any>
    ? Snapshotify<T>
    : never;

export function SnapshotTimeseries<TRow extends Snapshot>({
  data,
  config,
}: {
  data: Snapshotify<TRow>[];
  config: SnapshotTimeseriesConfig<TRow>[];
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

  const dataset = useMemo(() => {
    let ts = data.map((snapshot) => {
      return [
        ts2Date(snapshot.roundedTimestamp).getTime(),
        // @ts-ignore
        new Decimal(snapshot[selectedConfig.key]).toNumber(),
      ];
    });
    // sort by date
    ts.sort((a, b) => a[0] - b[0]);
    return ts;
  }, [data, selectedConfig.key]);

  const chartOptions: EChartsOption = useMemo(
    () => ({
      dataset: {
        source: dataset,
      },
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
        formatter: function (params) {
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
        },
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
      series: [
        {
          type: "line",
          areaStyle: {},
        },
      ],
    }),
    [dataset, selectedConfig, yAxisFitData, setYAxisFitData]
  );

  return (
    <div className="w-full flex items-stretch flex-col">
      <div className="max-w-full m-auto">
        <div className="flex gap-unit-md">
          <Select
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
