import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useColumnsPerEvent } from "@/Data/dataPerEvent";
import { useParsedData } from "@/hooks/parseData";
import React from "react";
import { Spinner } from "../ui/spinner";

export function ExampleTable() {


    const { data, loading, error } = useParsedData({maxRows: 10000 });
      const [tick, setTick] = React.useState(0);
      React.useEffect(() => {
        const interval = setInterval(() => {
          setTick((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

        const columns = useColumnsPerEvent(data, 5, tick);

    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Event number</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>ADC</TableHead>
            <TableHead>SiPM</TableHead>
            <TableHead>Deadtime</TableHead>
            <TableHead>Temp</TableHead>
            <TableHead>Press</TableHead>
            <TableHead>Accel</TableHead>
            <TableHead>Gyro</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {loading ? (
                <TableRow>
                <TableCell colSpan={9} className="text-center">
                    <Spinner />
                </TableCell>
                </TableRow>
            ) : error ? (
                <TableRow>
                <TableCell colSpan={9} className="text-center">
                    Error: {error}
                </TableCell>
                </TableRow>
            ) : (
        columns.event
            .map((_, i) => ({
            event: columns.event[i],
            timestamp: Number(columns.timestamp[i]).toFixed(2), 
            adc: columns.adc[i],
            sipm: columns.sipm[i],
            deadtime: Number(columns.deadtime[i]).toFixed(3), 
            temp: columns.temp[i],
            press: columns.press[i],
            accel: `${Number(columns.accelX[i]).toFixed(1)}:${Number(columns.accelY[i]).toFixed(1)}:${Number(columns.accelZ[i]).toFixed(1)}`,
            gyro: `${columns.gyroX[i]}:${columns.gyroY[i]}:${columns.gyroZ[i]}`
            }))
            .reverse()
            .map((row, i) => (
            <TableRow key={i}>
                <TableCell>{row.event}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.adc}</TableCell>
                <TableCell>{row.sipm}</TableCell>
                <TableCell>{row.deadtime}</TableCell>
                <TableCell>{row.temp}</TableCell>
                <TableCell>{row.press}</TableCell>
                <TableCell>{row.accel}</TableCell>
                <TableCell>{row.gyro}</TableCell>
            </TableRow>
            ))
        )}
        </TableBody>
        </Table>
    );
}
