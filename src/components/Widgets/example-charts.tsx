"use client"

import { calcRate } from "@/Data/calculateRate"
import { getColumnsPerEvent } from "@/Data/dataPerEvent"
import { useParsedData, type RawRow } from "@/hooks/parseData"
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

      const XAxisDatakey = dataset?.includes("rate") ? "time" : "time"

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
              tickMargin={8}
              tickFormatter={(v: number) => `${v}s`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

            {dataset?.slice(0, 3).map((key, index) => (
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
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(v: number) => `${v}s`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="rate" fill="var(--color-desktop)" radius={8} />
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
              tickMargin={8}
              tickFormatter={(v: number) => `${v}s`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="rate"
              type={type}
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type={type}
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
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
  
  const { data, loading, error } = useParsedData({maxRows: 100 });
  // Memoize graphData safely, even if data is undefined yet
  const graphData = React.useMemo(() => {
  if (!data || !data.length) return [];

  const maxRows = 1000;

  // Rate array
  const rateArray = calcRate(data, 10).slice(0, maxRows);

  // Andere kolommen per event
  const columns = getColumnsPerEvent(data, maxRows);

  const mergedData = Array.from({ length: rateArray.length }).map((_, i) => {
    if (rateArray[i]?.time === undefined) {
      throw new Error(`Missing 'time' for event index ${i} in rateArray`);
    }

    return {
      event: columns.event[i],
      time: rateArray[i].time,
      rate: rateArray[i].rate,
      adc: columns.adc[i],
      sipm: columns.sipm[i],
      deadtime: columns.deadtime[i],
      temp: columns.temp[i],
      press: columns.press[i],
      accelX: columns.accelX[i],
      accelY: columns.accelY[i],
      accelZ: columns.accelZ[i],
      gyroX: columns.gyroX[i],
      gyroY: columns.gyroY[i],
      gyroZ: columns.gyroZ[i],
      timestamp: columns.timestamp[i],
    };
  });

  return mergedData;
}, [data]);

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
        <div>Loading…</div>
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
