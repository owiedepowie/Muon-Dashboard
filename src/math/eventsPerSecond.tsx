import type { RawRow } from "../Data/parseData";


function lowerBoundByTimestamp(data: RawRow[], target: number) {
  let lo = 0;
  let hi = data.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (data[mid].Timestamp < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function eventsPerSecond(data: RawRow[], windowSec: number) {
  console.log("eventsPerSecond called", data?.length);
  if (!data || data.length === 0) return [];

  const lastIdx = data.length - 1;
  const latest = windowSec;
  const windowStart = 0;
  console.log("latest", latest, "windowStart", windowStart);
  const startIdx = lowerBoundByTimestamp(data, windowStart);

  const countsMap = new Map<number, number>();
  for (let i = startIdx; i <= lastIdx; i++) {
    const t = Math.floor(data[i].Timestamp);
    countsMap.set(t, (countsMap.get(t) || 0) + 1);
  }

  const result: { time: number; events: number }[] = [];
  const startSec = Math.floor(windowStart);
  const endSec = Math.floor(latest);
  for (let s = startSec; s <= endSec - 1; s++) {
    result.push({ time: s + 1 - startSec, events: countsMap.get(s) || 0 });
  }

  return result;
}
