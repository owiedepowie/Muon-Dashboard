// src/types/chart.ts
export type ChartConfig = {
  id: string;
  chart: "pie" | "radar" | "line" | "bar" | "area";
  title?: string;
  type?: "natural" | "linear" | "step";
  label?: "none" | "label" | "dots";
  legend?: boolean;
  trend?: boolean;
  calendar?: boolean;
  dataset?: string[];
};
