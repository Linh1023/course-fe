import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  isSearching?: boolean;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  isSearching,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const [columnName, sortOrder] = searchParams.get("sort")?.split(".") ?? [];
  const isSorted = columnName === column.id;

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              sortOrder === "desc" && isSorted
                ? "Sorted descending. Click to sort ascending."
                : sortOrder === "asc" && isSorted
                ? "Sorted ascending. Click to sort descending."
                : "Not sorted. Click to sort ascending."
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            disabled={isSearching}
          >
            <span>{title}</span>
            {isSearching ? (
              <Loader2Icon className="ml-2 size-4 animate-spin" aria-hidden="true" />
            ) : sortOrder === "desc" && isSorted ? (
              <ArrowDownIcon className="ml-2 size-4" aria-hidden="true" />
            ) : sortOrder === "asc" && isSorted ? (
              <ArrowUpIcon className="ml-2 size-4" aria-hidden="true" />
            ) : (
              <ChevronsUpDownIcon className="ml-2 size-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 size-3.5 text-muted-foreground/70" aria-hidden="true" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 size-3.5 text-muted-foreground/70" aria-hidden="true" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}