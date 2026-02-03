// src/pages/Home.tsx
import { ExampleChart } from "@/components/Widgets/example-charts";
import { useCharts } from "@/state/ChartContext";

export default function Home() {
  const { charts } = useCharts();

  return (
    <div className="grid grid-cols-3 gap-4">
      {charts.map(chart => (
        <ExampleChart
          key={chart.id}
          chart={chart.chart}
          title={chart.title}
          type={chart.type}
          label={chart.label}
          legend={chart.legend}
          trend={chart.trend}
          calendar={chart.calendar}
          dataset={chart.dataset}
        />
      ))}
    </div>
  );
}