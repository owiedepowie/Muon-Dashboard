"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type{ DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface CalendarTriggerProps {
  range: DateRange | undefined
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function CalendarTrigger({ range, setRange }: CalendarTriggerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
    <PopoverTrigger asChild>
        <Button variant="outline">
        <CalendarIcon />
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto overflow-hidden p-0 z-[2000]" align="end">
        <Calendar
        className="w-full"
        mode="range"
        defaultMonth={range?.from}
        selected={range}
        onSelect={setRange}
        captionLayout="dropdown-months"
        disabled={{
            after: new Date(2025, 5, 30),
        }}
        />
    </PopoverContent>
    </Popover>
  )
}

interface CalendarRangeProps {
  range: DateRange | undefined
}

export function CalendarRange({ range }: CalendarRangeProps) {
    return (
        <div>
            {range?.from && range?.to
                ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                : "June 2025"}
        </div>
    )
}