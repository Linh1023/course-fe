import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { createQueryString } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { DataTableFacetedFilter } from "../data-table-faceted-filter"
import { useTableInstanceContext } from "../table-instance-provider"
import { DataTableFilterOption } from "@/types/ui/data-table"

interface DataTableMultiFilterProps<TData> {
  allOptions: DataTableFilterOption<TData>[]
  options: DataTableFilterOption<TData>[]
  selectedOptions: DataTableFilterOption<TData>[]
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<DataTableFilterOption<TData>[]>
  >
  defaultOpen: boolean
}

export function DataTableMultiFilter<TData>({
  allOptions,
  options,
  selectedOptions,
  setSelectedOptions,
  defaultOpen,
}: DataTableMultiFilterProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 truncate rounded-full"
        >
          {/* <TextAlignCenterIcon className="mr-2 size-3" aria-hidden="true" /> */}
          {options.length} rule
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit p-0 text-xs dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40"
        align="start"
      >
        <div className="space-y-2 p-4">
          {options.map((option, i) => (
            <MultiFilterRow
              key={option.id ?? i}
              i={i}
              option={option}
              allOptions={allOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          ))}
        </div>
        <Separator />
        <div className="p-1">
          <Button
            aria-label="Delete filter"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              setSelectedOptions((prev) => prev.filter((item) => !item.isMulti))

              const paramsObj: Record<string, null | string> = {}
              for (const option of options) {
                paramsObj[option.value as string] = null
              }
              const newSearchParams = createQueryString(paramsObj, searchParams)
              router.push(`${pathname}?${newSearchParams}`, {
                scroll: false,
              })
            }}
          >
            Delete filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface MultiFilterRowProps<TData> {
  i: number
  allOptions: DataTableFilterOption<TData>[]
  option: DataTableFilterOption<TData>
  selectedOptions: DataTableFilterOption<TData>[]
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<DataTableFilterOption<TData>[]>
  >
}

export function MultiFilterRow<TData>({
  i,
  option,
  allOptions,
  selectedOptions,
  setSelectedOptions,
}: MultiFilterRowProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const value = option.filterValues?.[0] ?? ""
  const debounceValue = useDebounce(value, 500)

  const { tableInstance: table } = useTableInstanceContext()

  const column = table.getColumn(option.value ? String(option.value) : "")

  const comparisonOperators =
    option.options.length > 0


  const [mounted, setMounted] = React.useState(false)

  // Update query string
  React.useEffect(() => {
    if (!mounted) {
      setMounted(true)
      return
    }

    if (option.options.length > 0) {
      // key=value1.value2.value3~operator
      const filterValues = option.filterValues ?? []
      const paramsObj: Record<string, string | null> = {
        [String(option.value)]: filterValues.join("."),
      }
      const newSearchParams = createQueryString(
        paramsObj,
        searchParams
      )
      router.push(`${pathname}?${newSearchParams}`, {
        scroll: false,
      })
    } else {
      // key=value~operator
      const newSearchParams = createQueryString(
        {
          [String(option.value)]: debounceValue,
        },
        searchParams
      )
      router.push(`${pathname}?${newSearchParams}`, {
        scroll: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue])

  return (
    <div className="flex items-center space-x-2">
      <Select
        disabled={!!option.filterValues?.filter(Boolean).length}
        value={String(option.value)}
        onValueChange={(value) => {
          const chosenOption = allOptions.find(
            (option) => option.value === value
          )
          if (!chosenOption) return

          setSelectedOptions((prev) =>
            prev.map((item) => {
              if (item.id === option.id) {
                return {
                  ...item,
                  value: chosenOption.value,
                  label: chosenOption.label,
                  options: chosenOption.options ?? [],
                }
              }
              return item
            })
          )
        }}
      >
        <SelectTrigger className="h-8 w-full text-xs capitalize">
          <SelectValue placeholder={option.label} />
        </SelectTrigger>
        <SelectContent className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40">
          <SelectGroup>
            {allOptions.map((option) => (
              <SelectItem
                key={String(option.value)}
                value={String(option.value)}
                className="text-xs capitalize"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {option.options.length ? (
        <DataTableFacetedFilter
          key={option.id}
          column={column}
          title={option.label}
          options={option.options}
          selectedOption={option}
          setSelectedOptions={setSelectedOptions}
        />
      ) : (
        <Input
          placeholder="Type here..."
          className="h-8"
          value={value}
          onChange={(event) =>
            setSelectedOptions((prev) =>
              prev.map((item) => {
                if (item.value === column?.id) {
                  return {
                    ...item,
                    filterValues: [event.target.value],
                  }
                }
                return item
              })
            )
          }
          autoFocus
        />
      )}
    </div>
  )
}
