// src/Data/parseData.tsx
import { useEffect, useMemo, useState } from "react";

export type RawRow = {
  Event: number;
  Timestamp: number;
  Flag: number;
  ADC: number;
  SiPM: number;
  Deadtime: number;
  Temp: number;
  Press: number;
  Accel: { x: number; y: number; z: number };
  Gyro: { x: number; y: number; z: number };
};

export function useParsedData(options?: { maxRows?: number }) {
  const [data, setData] = useState<RawRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const maxRows = options?.maxRows ?? Infinity;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/Data/ExampleData.txt");
        if (!res.ok) throw new Error(`Failed to fetch ExampleData.txt (${res.status})`);
        const text = await res.text();

        // Split into lines
        const rawLines = text.split(/\r?\n/);

        // Skip comment lines starting with '#' and empty lines
        const dataLines = rawLines.filter(l => l.trim() !== "" && !l.trim().startsWith("#"));

        // Hardcode headers
        const headers = ["Event", "Timestamp", "Flag", "ADC", "SiPM", "Deadtime", "Temp", "Press", "Accel", "Gyro"];

        const parsed: RawRow[] = [];

        for (const line of dataLines) {
          if (cancelled) break;
          const cols = line.trim().split(/\s+/);

          if (cols.length < headers.length) {
            console.warn("Skipping malformed line (too few columns):", line);
            continue;
          }

          const row: any = {};
          for (let i = 0; i < headers.length; i++) {
            const key = headers[i];
            const val = cols[i];

            if (key === "Accel" || key === "Gyro") {
              const [x, y, z] = val.split(":").map(Number);
              row[key] = { x, y, z };
            } else {
              const num = Number(val);
              row[key] = Number.isNaN(num) ? val : num;
            }
          }

          parsed.push(row);
          if (parsed.length >= maxRows) break;
        }

        if (!cancelled) {
          setData(parsed);
          setLoading(false);
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error(err);
          setError(err?.message ?? String(err));
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [options?.maxRows]);

  const stableData = useMemo(() => data, [data.length]);

  return { data: stableData, loading, error };
}
