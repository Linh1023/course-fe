"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DataTableFilterOption } from "@/types/ui/data-table"
import { ChevronDownIcon, ChevronsUpDown, PlusIcon, TextIcon } from "lucide-react"

interface DataTableFilterComboboxProps<TData> {
  selectableOptions: DataTableFilterOption<TData>[]
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<DataTableFilterOption<TData>[]>
  >
  onSelect: () => void
  children?: React.ReactNode
}

export function DataTableFilterCombobox<TData>({
  selectableOptions,
  setSelectedOptions,
  onSelect,
  children,
}: DataTableFilterComboboxProps<TData>) {
  const [value, setValue] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {children ? (
        <PopoverTrigger asChild>{children}</PopoverTrigger>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  ref={buttonRef}
                  variant="outline"
                  size="sm"
                  role="combobox"
                  className="capitalize"
                >
                  <ChevronsUpDown
                    className="mr-2 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  Filter
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      )}

      <PopoverContent
        className="w-[12.5rem] p-0 dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40"
        align="start"
      >
        <Command className="dark:bg-transparent">
          <CommandInput placeholder="Filter by..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {selectableOptions.map((option) => (
                <CommandItem
                  key={String(option.value)}
                  className="capitalize"
                  value={String(option.value)}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setSelectedOptions((prev) => {
                      return [...prev, { ...option }]
                    })
                    onSelect()
                  }}
                >
                  {option.options.length > 0 ? (
                    <ChevronDownIcon
                      className="mr-2 size-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <TextIcon className="mr-2 size-4" aria-hidden="true" />
                  )}
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
