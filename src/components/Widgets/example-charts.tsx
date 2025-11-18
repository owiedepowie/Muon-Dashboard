"use client"

import { calcRate } from "@/Data/calculateRate"
import { useColumnsPerEvent } from "@/Data/dataPerEvent"
import { useParsedData } from "@/hooks/parseData"
import { TrendingUp } from "lucide-react"
import { 
  PolarAngleAxis, 
  PolarGrid, 
  Radar, 
  RadarChart,
  Pie,
  PieChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  Bar,
  BarChart,
  Area,
  AreaChart
} from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { useTranslation } from "react-i18next";
import { CalendarRange, CalendarTrigger } from "@/components/Widgets/Calendar";
import type { DateRange } from "node_modules/react-day-picker/dist/esm/types/shared"
import React from "react"
import { Spinner } from "../ui/spinner"

const chartData = [
  { month: "Bananuary", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  rate: { label: "Rate", color: "var(--chart-1)" },
  adc: { label: "ADC", color: "var(--chart-2)" },
  sipm: { label: "SiPM", color: "var(--chart-3)" },
  deadtime: { label: "Deadtime", color: "var(--chart-4)" },
  temp: { label: "Temperature", color: "var(--chart-5)" },
  press: { label: "Pressure", color: "var(--chart-6)" },
  accel: { label: "Acceleration", color: "var(--chart-7)" },
  gyro: { label: "Gyro",color: "var(--chart-8)" },
} satisfies ChartConfig;

const chartDataPie = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfigPie = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Data-type-1",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Data-type-2",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Data-type-3",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Data-type-4",
    color: "var(--chart-4)",
  },
  other: {
    label: "Data-type-5",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

interface ExampleChartProps {
  chart: "pie" | "radar" | "line" | "bar" | "area";
  title?: string;
  type?: "natural" | "linear" | "step";
  label?: "none" | "label" | "dots";
  legend?: boolean;
  trend?: boolean;
  calendar?: boolean;
  dataset?: string[];
}

const chartTitles: Record<ExampleChartProps["chart"], string> = {
  pie: "chart.title.pie",
  radar: "chart.title.radar",
  line: "chart.title.line",
  bar: "chart.title.bar",
  area: "chart.title.area",
}

function renderChart(
  chart: "pie" | "radar" | "line" | "bar" | "area",
  type?: "natural" | "linear" | "step",
  label?: "none" | "label" | "dots",
  legend?: boolean,
  graphData?: { time: number; rate: number }[],
  dataset?: string[]
) {
  const XAxisDatakey = dataset?.includes("rate") ? "time" : "event"
  const keys = (dataset && dataset.length > 0 ? dataset : ["rate"]).slice(0, 3);
  switch (chart) {
    

    case "pie":
      return (
        <ChartContainer
          config={chartConfigPie}
          className="[&_.recharts-pie-label-text]:fill-foreground w-auto h-30"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartDataPie} dataKey="visitors" nameKey="browser" label />
            {legend && (<ChartLegend content={<ChartLegendContent />} />)}
          </PieChart>
        </ChartContainer>
      )
    case "radar":
      return (
        <ChartContainer
          config={chartConfig}
          className="w-auto h-30"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            {legend && (<ChartLegend content={<ChartLegendContent />} />)}
          </RadarChart>
        </ChartContainer>
      )
    case "line":

      return (
        <ChartContainer config={chartConfig}>
          <LineChart
            data={graphData}
            margin={{ top: 20, left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={XAxisDatakey}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(v: number) => `${v}s`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

            {keys.map((key, index) => (
              <Line
                key={key}
                dataKey={key}
                type={type}
                stroke={index === 0 ? "var(--chart-1)" : index === 1 ? "var(--chart-2)" : "var(--chart-3)"}
                strokeWidth={2}
                dot={label !== "none" ? { fill: index === 0 ? "var(--chart-1)" : index === 1 ? "var(--chart-2)" : "var(--chart-3)" } : false}
                activeDot={label !== "none" ? { r: 6 } : false}
              >
                {label === "label" && <LabelList position="top" offset={12} formatter={(value: any) => value}  />}
              </Line>
            ))}
            {legend && (
              <ChartLegend content={<ChartLegendContent />} />
            )}
          </LineChart>
        </ChartContainer>
      )
    case "bar":
      return (
        <ChartContainer config={chartConfig}>
          <BarChart data={graphData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={XAxisDatakey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(v: number) => `${v}s`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            {keys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                type={type}
                fill={index === 0 ? "var(--chart-1)" : index === 1 ? "var(--chart-2)" : "var(--chart-3)"}
              >
              </Bar>
            ))}
            {legend && (<ChartLegend content={<ChartLegendContent />} />)}
          </BarChart>
        </ChartContainer>
      )
    case "area":
      return (
        <ChartContainer config={chartConfig}>
          <AreaChart data={graphData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(v: number) => `${v}s`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            {keys.map((key, index) => (
              <Area
                key={key}
                dataKey={key}
                type={type}
                stroke={index === 0 ? "var(--chart-1)" : index === 1 ? "var(--chart-2)" : "var(--chart-3)"}
                fill={index === 0 ? "var(--chart-1)" : index === 1 ? "var(--chart-2)" : "var(--chart-3)"}
                fillOpacity={0.4}
                dot={label !== "none" ? { fill: index === 0 ? "var(--chart-1)" : index === 1 ? "var(--chart-2)" : "var(--chart-3)" } : false}
                activeDot={label !== "none" ? { r: 6 } : false}
              >
                {label === "label" && <LabelList position="top" offset={12} formatter={(value: any) => value}  />}
              </Area>
            ))}
            {legend && (<ChartLegend content={<ChartLegendContent />} />)}
          </AreaChart>
        </ChartContainer>
      )
  }
}

export function ExampleChart({ 
  chart, 
  title = "",
  type = "natural", 
  label = "label", 
  legend = false, 
  trend = false, 
  calendar = false,
  dataset = []
  }: ExampleChartProps) {

    const { t } = useTranslation();

    const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 5),
    to: new Date(2025, 5, 20),
  })
  const { data, loading, error } = useParsedData({maxRows: 10000 });
  const [tick, setTick] = React.useState(0);
  const [graphData, setGraphData] = React.useState<{ time: number; rate: number }[]>([]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  React.useEffect(() => {
    if (!data || !data.length) return;

    // recompute columns for this tick
    const columns = useColumnsPerEvent(data, 10, tick);
    const rateArray = calcRate(data, tick+1);

    const rate = rateArray[tick];

    const point = {
      event: columns.event[0], // first event in this tick window
      time: rate.time,
      rate: rate.rate,
      adc: columns.adc[0],
      sipm: columns.sipm[0],
      deadtime: columns.deadtime[0],
      temp: columns.temp[0],
      press: columns.press[0],
      accelX: columns.accelX[0],
      accelY: columns.accelY[0],
      accelZ: columns.accelZ[0],
      gyroX: columns.gyroX[0],
      gyroY: columns.gyroY[0],
      gyroZ: columns.gyroZ[0],
      timestamp: columns.timestamp[0],
    };
    // append to graphData and keep a sliding window
    setGraphData((prev) => {
      const updated = [...prev, point];
      return updated.slice(-10); // keep last 50 points
    });
  }, [tick, data]);
  
  return (
    <Card className="w-60 h-60 gap-4 transition">
      <CardHeader>
        <CardTitle className="text-sm font-bold max-w-50 overflow-hidden whitespace-nowrap text-ellipsis">
          {title || t(chartTitles[chart])}
          </CardTitle>
        <CardDescription>
          {calendar && (<CalendarRange range={range} />)}
          </CardDescription>
        <CardAction>
          {calendar && (<CalendarTrigger range={range} setRange={setRange} />)}
        </CardAction>
      </CardHeader>
      <CardContent>
        {loading ? (
        <div className="flex justify-center items-center h-30">
          <Spinner className="size-6"/>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        renderChart(chart, type, label, legend, graphData, dataset)
      )}
      </CardContent>
      {trend && (<CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {t("currenttrend")} {<TrendingUp className="h-4 w-4" />}
        </div>
      </CardFooter>
    )}
    </Card>
  )
  }
