// src/state/ChartContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ChartConfig } from "@/types/chart";

export type ChartContextType = {
  charts: ChartConfig[];
  addChart: (chart: ChartConfig) => void;
  removeChart: (id: string) => void;
};

const ChartContext = createContext<ChartContextType | null>(null);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const [charts, setCharts] = useState<ChartConfig[]>([]);

  const addChart = (chart: ChartConfig) => {
    setCharts(prev => [...prev, chart]);
  };

  const removeChart = (id: string) => {
    setCharts(prev => prev.filter(chart => chart.id !== id));
  };

  return (
    <ChartContext.Provider value={{ charts, addChart, removeChart }}>
      {children}
    </ChartContext.Provider>
  );
}

export function useCharts() {
  const ctx = useContext(ChartContext);
  if (!ctx) throw new Error("useCharts must be used inside ChartProvider");
  return ctx;
}
