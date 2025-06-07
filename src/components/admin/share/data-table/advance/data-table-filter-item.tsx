import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn, createQueryString } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTableInstanceContext } from "../table-instance-provider"
import { DataTableFilterOption } from "@/types/ui/data-table"
import { TrashIcon } from "lucide-react"
import { DataTableAdvancedFacetedFilter } from "./data-table-advanced-faceted-filter"
import { split } from "postcss/lib/list"

interface DataTableFilterItemProps<TData> {
  selectedOption: DataTableFilterOption<TData>
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<DataTableFilterOption<TData>[]>
  >
  defaultOpen: boolean
  setIsLoading?: (v: boolean) => void
}

export function DataTableFilterItem<TData>({
  selectedOption,
  setSelectedOptions,
  defaultOpen,
  setIsLoading
}: DataTableFilterItemProps<TData>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { tableInstance: table } = useTableInstanceContext()

  const column = table.getColumn(
    selectedOption.value ? String(selectedOption.value) : ""
  )

  const selectedValues = new Set(selectedOption.filterValues)

  const value = selectedOption.filterValues?.[0] ?? ""
  const debounceValue = useDebounce(value, 500)
  const [open, setOpen] = React.useState(defaultOpen)

  React.useEffect(() => {
    if (selectedOption.options.length > 0) {
      // key=value1.value2.value3
      const filterValues = selectedOption.filterValues ?? []
      const newSearchParams = createQueryString(
        {
          [selectedOption.value]: filterValues.join("."),
          page: "1",
        },
        searchParams
      )

      // if (debounceValue != "") {
        if (setIsLoading) {
          setIsLoading(true)
        }
      // }

      router.push(`${pathname}?${newSearchParams}`, {
        scroll: false,
      })
    } else {
      // key=value
      const newSearchParams = createQueryString(
        {
          [selectedOption.value]: debounceValue,
          page: "1",
        },
        searchParams
      )

      // if (debounceValue != "") {
        if (setIsLoading) {
          setIsLoading(true)
        }
      // }


      router.push(`${pathname}?${newSearchParams}`, {
        scroll: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, debounceValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-7 gap-0 truncate rounded-full",
            (selectedValues.size > 0 || value.length > 0) && "bg-muted/50"
          )}
        >
          <span className="font-medium capitalize">{selectedOption.label}</span>
          {selectedOption.options.length > 0
            ? selectedValues.size > 0 && (
              <span className="text-muted-foreground">
                <span className="text-foreground">: </span>
                {selectedValues.size > 2
                  ? `${selectedValues.size} selected`
                  : selectedOption.options
                    .filter((item) => selectedValues.has(item.value))
                    .map((item) => item.label)
                    .join(", ")}
              </span>
            )
            : value.length > 0 && (
              <span className="text-muted-foreground">
                <span className="text-foreground">: </span>
                {value}
              </span>
            )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-60 space-y-1.5 p-2 dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40"
        align="start"
      >
        <div className="flex items-center space-x-1 pl-1 pr-0.5">
          <div className="flex flex-1 items-center space-x-1">
            <div className="text-xs capitalize text-muted-foreground">
              {selectedOption.label}
            </div>
          </div>
          <Button
            aria-label="Remove filter"
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground"
            onClick={() => {
              setSelectedOptions((prev) =>
                prev.filter((item) => item.value !== selectedOption.value)
              )

              const newSearchParams = createQueryString(
                {
                  [selectedOption.value]: undefined,
                  page: "1",
                },
                searchParams
              )

              if (setIsLoading) {
                setIsLoading(true)
              }

              router.push(`${pathname}?${newSearchParams}`, {
                scroll: false,
              })

            }}
          >
            <TrashIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
        {selectedOption.options.length > 0 ? (
          column && (
            <DataTableAdvancedFacetedFilter
              key={String(selectedOption.value)}
              column={column}
              title={selectedOption.label}
              options={selectedOption.options}
              selectedValues={selectedValues}
              setSelectedOptions={setSelectedOptions}
            />
          )
        ) : (
          <Input
            placeholder="Nhập giá trị để lọc..."
            className="h-8"
            value={value}
            onChange={(event) => {
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
            }
            autoFocus
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
