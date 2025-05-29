"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { DataTableFilterField, DataTableFilterOption } from "@/types/ui/data-table"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, PlusIcon } from "lucide-react"
import { DataTableFilterCombobox } from "./data-table-filter-combobox"
import { DataTableMultiFilter } from "./data-table-multi-filter"
import { DataTableFilterItem } from "./data-table-filter-item"

interface DataTableAdvancedToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTableAdvancedToolbar<TData>({
  filterFields = [],
  children,
  className,
  ...props
}: DataTableAdvancedToolbarProps<TData>) {
  const searchParams = useSearchParams()

  const options = React.useMemo<DataTableFilterOption<TData>[]>(() => {
    return filterFields.map((field) => ({
      id: crypto.randomUUID(),
      label: field.label,
      value: field.value,
      options: field.options ?? [],
    }))
  }, [filterFields])

  const initialSelectedOptions = React.useMemo(() => {
    return options
      .filter((option) => searchParams.has(option.value as string))
      .map((option) => {
        const value = searchParams.get(String(option.value)) ?? ""
        return {
          ...option,
          filterValues: value?.split(".") ?? [],
        }
      })
  }, [options, searchParams])

  const [selectedOptions, setSelectedOptions] = React.useState<
    DataTableFilterOption<TData>[]
  >(initialSelectedOptions)
  const [openFilterBuilder, setOpenFilterBuilder] = React.useState(
    initialSelectedOptions.length > 0
  )
  const [openCombobox, setOpenCombobox] = React.useState(false)

  const multiFilterOptions = selectedOptions.filter((option) => option.isMulti)
  const selectableOptions = options.filter(
    (option) =>
      !selectedOptions.some(
        (selectedOption) => selectedOption.value === option.value
      )
  )

  function onFilterComboboxItemSelect() {
    setOpenFilterBuilder(true)
    setOpenCombobox(true)
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col space-y-2.5 overflow-auto p-1",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {children}

          {(options.length > 0 && selectedOptions.length > 0) ||
            openFilterBuilder ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenFilterBuilder(!openFilterBuilder)}
            >
              <ChevronsUpDown className="mr-2 size-4 shrink-0" />
              Filter
            </Button>
          ) : (
            <DataTableFilterCombobox
              selectableOptions={selectableOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              onSelect={onFilterComboboxItemSelect}
            />
          )}

        </div>
      </div>

      {openFilterBuilder && (
        <div className="flex items-center gap-2">
          {selectedOptions
            .filter((option) => !option.isMulti)
            .map((selectedOption) => (
              <DataTableFilterItem
                key={String(selectedOption.value)}
                selectedOption={selectedOption}
                setSelectedOptions={setSelectedOptions}
                defaultOpen={openCombobox}
              />
            ))}

          {multiFilterOptions.length > 0 && (
            <DataTableMultiFilter
              allOptions={options}
              options={multiFilterOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              defaultOpen={openCombobox}
            />
          )}

          {selectableOptions.length > 0 && (
            <DataTableFilterCombobox
              selectableOptions={selectableOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              onSelect={onFilterComboboxItemSelect}
            >
              <Button
                variant="outline"
                size="sm"
                className="h-7 rounded-full"
                onClick={() => setOpenCombobox(true)}
              >
                <PlusIcon className="mr-2 size-4 opacity-50" />
                Add filter
              </Button>
            </DataTableFilterCombobox>
          )}
        </div>
      )}
    </div>
  )
}
