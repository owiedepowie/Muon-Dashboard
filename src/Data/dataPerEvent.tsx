import type { RawRow } from "../hooks/parseData";

interface ColumnsPerEvent {
  event: number[];
  adc: number[];
  sipm: number[];
  deadtime: number[];
  temp: number[];
  press: number[];
  accelX: number[];
  accelY: number[];
  accelZ: number[];
  gyroX: number[];
  gyroY: number[];
  gyroZ: number[];
  timestamp: number[];
}

export function getColumnsPerEvent(data: RawRow[], maxRows?: number): ColumnsPerEvent {
  const len = maxRows ? Math.min(maxRows, data.length) : data.length;

  const event: number[] = [];
  const adc: number[] = [];
  const sipm: number[] = [];
  const deadtime: number[] = [];
  const temp: number[] = [];
  const press: number[] = [];
  const accelX: number[] = [];
  const accelY: number[] = [];
  const accelZ: number[] = [];
  const gyroX: number[] = [];
  const gyroY: number[] = [];
  const gyroZ: number[] = [];
  const timestamp: number[] = [];

  for (let i = 0; i < len; i++) {
    const row = data[i];
    event.push(row.Event);
    adc.push(row.ADC);
    sipm.push(row.SiPM);
    deadtime.push(row.Deadtime);
    temp.push(row.Temp);
    press.push(row.Press);
    accelX.push(row.Accel.x);
    accelY.push(row.Accel.y);
    accelZ.push(row.Accel.z);
    gyroX.push(row.Gyro.x);
    gyroY.push(row.Gyro.y);
    gyroZ.push(row.Gyro.z);
    timestamp.push(row.Timestamp);
  }

  return { event, adc, sipm, deadtime, temp, press, accelX, accelY, accelZ, gyroX, gyroY, gyroZ, timestamp };
}
