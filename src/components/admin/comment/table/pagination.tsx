import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { set } from "zod";

interface DataTablePaginationProps<TData> {
  pageSizeOptions?: number[];
  table: Table<TData>;
  setPageSize: (value: number) => void
  pageSize?: number;
  totalPage?: number;
  pageIndex?: number;
  setPageIndex: (value: number) => void;
}

export function DataTablePagination<TData>(props: DataTablePaginationProps<TData>) {
  const pageSizeOptions=props.pageSizeOptions||[10, 20, 30, 40, 50];
  const pageSize = props.pageSize? props.pageSize : 10;
  const table = props.table;
  const totalPage = props.totalPage || 1;
  const pageIndex = props.pageIndex || 0;
  const { setPageSize, setPageIndex } = props;

  return (
    <div className="flex items-center justify-between px-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length}/{table.getFilteredRowModel().rows.length} dòng được chọn.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Số dòng</p>
          <Select
            value={pageSize?.toString() || "10"}
            defaultValue="10"
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSizeOption) => (
                <SelectItem key={pageSizeOption} value={`${pageSizeOption}`} onClick={() => setPageSize(pageSizeOption)}>
                  {pageSizeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Trang {pageIndex + 1} / {totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(1)}
            disabled={pageIndex === 0 || !table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex===0|| !table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= totalPage - 1 || !table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(totalPage - 1)}
            disabled={!table.getCanNextPage() || pageIndex >= totalPage - 1}  
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}