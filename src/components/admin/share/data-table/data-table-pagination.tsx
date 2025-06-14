import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTableInstanceContext } from "./table-instance-provider"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEffect, useState } from "react"
import { updateQueryStringManually } from "@/utils/handle_query"
import { set } from "date-fns"


interface DataTablePaginationProps {
  pageSizeOptions?: number[]
  setIsLoading?: (v: boolean) => void
  setQuerySearch?: (v: string) => void,
  querySearch?: string
}

export function DataTablePagination({
  pageSizeOptions = [10, 20, 30, 40, 50],
  setIsLoading,
  setQuerySearch,
  querySearch
}: DataTablePaginationProps) {
  const searchParams = useSearchParams()

  const { tableInstance: table } = useTableInstanceContext()
  const [perPage, setPerPage] = useState(() => searchParams.get("perPage") ?? 10); // hoặc giá trị mặc định ban đầ
  const [page, setPage] = useState(() => searchParams.get("page") ?? 1); // hoặc giá trị mặc định ban đầu

  // const page = searchParams.get("page") ?? 1
  // const perPage = searchParams.get("perPage") ?? 10
  useEffect(() => {
    const pageIndex = Number(searchParams.get("page") ?? 1) - 1
    table.setPageIndex(pageIndex)
  }, [])

  const handleLoading = () => {
    if (setIsLoading) {
      setIsLoading(true)
    }
  }

  useEffect(() => {

    const currentPage = table.getState().pagination.pageIndex + 1;
    setPage(currentPage);
    if (querySearch != undefined && setQuerySearch) {
      const newQuerySearch = updateQueryStringManually(querySearch, "page", currentPage.toString())
      setQuerySearch(newQuerySearch)
      console.log("newQuerySearch >>> ", newQuerySearch)
    }
  }, [table.getState().pagination.pageIndex]);

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${perPage}`}
            onValueChange={(value) => {

              setPerPage(value)
              table.setPageIndex(0);
              table.setPageSize(Number(value));
              if (querySearch != undefined && setQuerySearch) {
                const newQuerySearch = updateQueryStringManually(querySearch, "perPage", value.toString())
                setQuerySearch(newQuerySearch)
              }
              handleLoading()
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent
              side="top"
              className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40"
            >
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {page} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className=" size-8 p-0 lg:flex"
            onClick={() => {
              // setPage(0)
              table.setPageIndex(0);
              handleLoading()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              table.previousPage();

              handleLoading()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              table.nextPage();
              handleLoading()
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className=" size-8 lg:flex"
            onClick={() => {
              // setPage(table.getPageCount() - 1)
              table.setPageIndex(table.getPageCount() - 1);
              handleLoading()
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
