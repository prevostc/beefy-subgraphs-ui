import { useQuery } from "urql";
import {
  ProtocolSnapshotsDocument,
  ProtocolSnapshotsQuery,
} from "../../../.graphclient";
import ReactECharts from "echarts-for-react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import QueryDebug from "../QueryDebug";
import {
  ProtocolTimeseriesConfig,
  protocolTimeseriesConfigs,
} from "./timeseries-config";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import Decimal from "decimal.js";
import { EChartsOption } from "echarts";
import { formatAs } from "../../utils/format-number";
import { ts2Date } from "../../utils/timestamp-to-date";

export function ProtocolTimeseries() {
  const [result, _] = useQuery({
    query: ProtocolSnapshotsDocument,
  });

  if (result.fetching || !result.data || !result.data.dailySnapshots) {
    return <Spinner size="lg" />;
  }

  return (
    <div>
      <div>
        <ProtocolSnapshotChart data={result.data.dailySnapshots} />
      </div>
      <div className="mt-5">
        <QueryDebug
          query={ProtocolSnapshotsDocument}
          result={result.data.dailySnapshots}
        />
      </div>
    </div>
  );
}

function ProtocolSnapshotChart({
  data,
}: {
  data: ProtocolSnapshotsQuery["dailySnapshots"];
}) {
  const [selectedConfig, setSelectedConfig] =
    useState<ProtocolTimeseriesConfig>(protocolTimeseriesConfigs[0]);

  const handleSelectionChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        const config = protocolTimeseriesConfigs.find(
          (config) => config.key === e.target.value
        );
        if (config) {
          setSelectedConfig(config);
        }
      },
      [setSelectedConfig]
    );

  const dataset = useMemo(
    () =>
      data
        .map((snapshot) => {
          return [
            ts2Date(snapshot.roundedTimestamp).getTime(),
            new Decimal(snapshot[selectedConfig.key]).toNumber(),
          ];
        })
        .reverse(),
    [data, selectedConfig.key]
  );

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
      yAxis: {},
      series: [
        {
          type: "line",
          areaStyle: {},
        },
      ],
    }),
    [dataset, selectedConfig]
  );

  return (
    <div className="w-full flex items-stretch flex-col">
      <div className="max-w-full">
        <Select
          selectedKeys={[selectedConfig.key]}
          onChange={handleSelectionChange}
          label="Timeserie type"
          placeholder="Select a metric"
          className="max-w-xs"
        >
          {protocolTimeseriesConfigs.map(({ key, title }) => (
            <SelectItem key={key} value={key}>
              {title}
            </SelectItem>
          ))}
        </Select>
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
