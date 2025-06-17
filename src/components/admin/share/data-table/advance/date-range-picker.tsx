"use client"
import * as React from "react"
import { format } from "date-fns"
import { createParser, useQueryState } from "nuqs"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarDays } from "lucide-react"
import { updateQueryStringManually } from "@/utils/handle_query"
import { useTableInstanceContext } from "../table-instance-provider"

const parseAsDate = createParser({
  parse(queryValue) {
    return new Date(queryValue)
  },
  serialize(value) {
    return format(value, "yyyy-MM-dd")
  },
})

interface DateRangePickerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  /**
   * The selected date range.
   * @default undefined
   * @type DateRange
   * @example { from: new Date(), to: new Date() }
   */
  // dateRange?: DateRange

  /**
   * The number of days to display in the date range picker.
   * @default undefined
   * @type number
   * @example 7
   */
  // dayCount?: number

  /**
   * The placeholder text of the calendar trigger button.
   * @default "Pick a date"
   * @type string | undefined
   */
  placeholder?: string

  /**
   * The variant of the calendar trigger button.
   * @default "outline"
   * @type "default" | "outline" | "secondary" | "ghost"
   */
  triggerVariant?: Exclude<ButtonProps["variant"], "destructive" | "link">

  /**
   * The size of the calendar trigger button.
   * @default "default"
   * @type "default" | "sm" | "lg"
   */
  triggerSize?: Exclude<ButtonProps["size"], "icon">

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type string
   */
  triggerClassName?: string

  setIsLoading: (v: boolean) => void
  setQuerySearch: (v: string) => void,
  querySearch: string


}

export function DateRangePicker({
  // dateRange,
  // dayCount,
  placeholder = "Pick a date",
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName,
  className,
  setQuerySearch,
  querySearch,
  setIsLoading,

  ...props
}: DateRangePickerProps) {

  const [fromDate, setFromDate] = React.useState<Date | null>(null)
  const [toDate, setToDate] = React.useState<Date | null>(null)

  const { tableInstance: table } = useTableInstanceContext()

  const from = fromDate ?? undefined
  const to = toDate ?? undefined

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button

            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              "w-full justify-start truncate text-left font-normal",
              !fromDate && !toDate && "text-muted-foreground",
              triggerClassName
            )}
          >

            <CalendarDays className="mr-2 size-4" />
            {fromDate ? (
              toDate ? (
                <>
                  {format(fromDate, "LLL dd, y")} -{" "}
                  {format(toDate, "LLL dd, y")}
                </>
              ) : (
                format(fromDate, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", className)} {...props}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={from}
            selected={{ from, to }}
            disabled={(date) => date > new Date()}
            onSelect={(value) => {

                const fromStr = value?.from ? parseAsDate.serialize(value.from) : undefined
                const toStr = value?.to ? parseAsDate.serialize(value.to) : undefined

                const newQuerySearch1 = updateQueryStringManually(querySearch, "from", fromStr)
                const newQuerySearch2 = updateQueryStringManually(newQuerySearch1, "to", toStr)
                const newQuerySearch = updateQueryStringManually(newQuerySearch2, "page", "1")
                if (newQuerySearch != querySearch ) {
                  setIsLoading(true)
                  setQuerySearch(newQuerySearch)
                }
              
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              setFromDate(value?.from ?? null)
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              setToDate(value?.to ?? null)
              table.setPageIndex(0)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
