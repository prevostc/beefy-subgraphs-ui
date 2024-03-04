import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useMemo } from "react";

export function SimpleDailyTsChart({ data }: { data: number[] }) {
  const dataset = useMemo(() => {
    let nowTruncated = new Date();
    nowTruncated.setHours(0, 0, 0, 0);
    return data
      .reverse()
      .map((v, i) => [nowTruncated.getTime() - i * 24 * 60 * 60 * 1000, v]);
  }, [data]);

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
    [dataset]
  );

  return (
    <div className="w-full">
      <ReactECharts
        style={{ height: "500px", width: "100%", maxWidth: "100%" }}
        option={chartOptions}
      />
    </div>
  );
}
