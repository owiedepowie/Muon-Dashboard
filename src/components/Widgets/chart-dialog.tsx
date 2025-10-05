import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { ExampleChart } from "./example-charts"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon, Plus } from "lucide-react";
import { useState } from "react";
import { 
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"

interface ChartDialogProps {
  chart: "pie" | "radar" | "line" | "bar" | "area";
}

const CheckboxItems = [
  { id: "legend", label: "Enable legend" },
  { id: "trend", label: "Enable trend footer" },
  { id: "calendar", label: "Enable calendar"}
];

type LineType = "natural" | "linear" | "step";
type LabelType = "none" | "label" | "dots";
type CheckboxState = {
  [key: string]: boolean;
};

export function ChartDialog({ chart }: ChartDialogProps) {
  const [lineType, setLineType] = useState<LineType>("natural");
  const [labelType, setLabelType] = useState<LabelType>("label");
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    legend: false,
    trend: false,
    calendar: false,
  });
  const [chartTitle, setChartTitle] = useState("")
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckboxes((prev) => ({ ...prev, [id]: checked }));
  };

  const SelectConfigs = [
    {
        id: "labelType",
        label: "Label Type",
        values: ["none", "label", "dots"],
        disabled: chart !== "line",
        value: labelType,
        onChange: (val: LabelType) => setLabelType(val),
    },
    {
        id: "lineType",
        label: "Line Type",
        values: ["natural", "linear", "step"],
        disabled: chart !== "line" && chart !== "area",
        value: lineType,
        onChange: (val: LineType) => setLineType(val),
    },
    ]

const [selectedOrder, setSelectedOrder] = useState<string[]>([])

    const handleCheckedChange = (value: string, checked: boolean) => {
    setSelectedOrder((prev) => {
        if (checked) {
        // toevoegen aan het einde als checked
        return [...prev, value]
        } else {
        // verwijderen als unchecked
        return prev.filter((v) => v !== value)
        }
    })
    }
    const DatasetItems = [
    {
        id: "data",
        values: ["events", "ADC", "SiPM", "deadtime", "temperature", "pressure", "acceleration", "gyro" ]
    }
    ]

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add {chart} chart widget</DialogTitle>
                <DialogDescription>
                    Configure and add a {chart} chart widget to your dashboard.
                </DialogDescription>
                <div className="flex flex-row justify-between">
                    <div className="mt-4 flex-col space-x-2">
                        <Input  
                            className="w-45 mb-2" 
                            value={chartTitle} 
                            onChange={(e) => setChartTitle(e.target.value)} 
                            placeholder="Chart Title"
                            maxLength={30} 
                        />
                        {SelectConfigs.map((config) => (
                        <Select
                            key={config.id}
                            disabled={config.disabled}
                            onValueChange={config.onChange as any}
                            value={config.value}
                        >
                            <SelectTrigger className="w-[180px] mb-2">
                            <SelectValue
                                placeholder={`Select a ${config.label.toLowerCase()}`}
                            />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{config.label}</SelectLabel>
                                {config.values.map((val) => (
                                <SelectItem key={val} value={val}>
                                    {val}
                                </SelectItem>
                                ))}
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                        ))}
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild className="w-[180px]">
                            <Button className="justify-between font-light px-3" variant="outline">Dataset <ChevronDownIcon className="size-4 opacity-30" /> </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[180px] sideOffset={5} collisionPadding={10}">
                            <DropdownMenuLabel className="font-light text-muted-foreground">Data</DropdownMenuLabel>
                            {DatasetItems.map((group) =>
                            group.values.map((value) => {
                                const index = selectedOrder.indexOf(value)
                                const maxSelected = selectedOrder.length >= 3
                                const isChecked = index !== -1
                                return (
                                <DropdownMenuCheckboxItem
                                    key={value}
                                    checked={isChecked}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleCheckedChange(value, index === -1)
                                    }}
                                    disabled={!isChecked && maxSelected}
                                    className="flex justify-between items-center data-[state=checked]:bg-accent disabled:cursor-not-allowed"
                                >
                                    <span>{value}</span>
                                    {isChecked && (
                                    <span className="ml-2 font-bold">{index + 1}</span>
                                    )}
                                </DropdownMenuCheckboxItem>
                                )
                            })
                            )}
                        </DropdownMenuContent>
                        </DropdownMenu>
                        {CheckboxItems.map((item) => (
                            <div className="flex items-center space-x-2 my-2" key={item.id}>
                                <Checkbox disabled={item.id === "legend" && chart === "pie"}
                                id={item.id}
                                checked={checkboxes[item.id] || false}
                                onCheckedChange={(checked) =>
                                    handleCheckboxChange(item.id, checked === true)
                                }
                                />
                                <Label htmlFor={item.id}>{item.label}</Label>
                            </div>
                        ))}
                    </div>
                    <ExampleChart 
                        chart={chart}
                        title={chartTitle}
                        type={lineType} 
                        label={labelType}
                        legend={checkboxes.legend}
                        trend={checkboxes.trend}
                        calendar={checkboxes.calendar}
                    />
                </div>
            </DialogHeader>
            <DialogFooter>
                <button className="bg-fuchsia-600 text-primary font-medium p-2 text-sm rounded-md hover:bg-fuchsia-600/90 transition">
                    <span className="flex items-center text-white"><Plus /> Add Widget</span>
                </button>
            </DialogFooter>
        </DialogContent>
    )
}