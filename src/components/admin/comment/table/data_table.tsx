"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DataTableFilterField } from "@/types/ui/data-table";

export type AdminComment = {
  id: string;
  lessonName: string;
  lessonId: string;
  accountName: string;
  accountId: string;
  status: "pending" | "processing" | "success" | "failed";
  createdAt: string;
  content: string;
};

interface DataTableProps {
  columns: ColumnDef<AdminComment, any>[];
  data: AdminComment[];
}

export function DataTable(props: DataTableProps) {
  const { columns } = props;
  const [rowSelection, setRowSelection] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<AdminComment[]>(props.data || []);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Khởi tạo sorting và pagination từ query parameters
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    const pageParam = searchParams.get("page");
    const pageSizeParam = searchParams.get("pageSize");

    if (sortParam) {
      const [columnName, sortOrder] = sortParam.split(".");
      setSorting([{ id: columnName, desc: sortOrder === "desc" }]);
      setSortBy(columnName);
      setOrder(sortOrder);
    }
    if (pageParam) {
      setPageIndex(Number(pageParam) - 1);
    }
    if (pageSizeParam) {
      setPageSize(Number(pageSizeParam));
    }
  }, [searchParams]);

  // Hàm fetch API
  const fetchData = async () => {
    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/users?page=${
          pageIndex + 1
        }&pageSize=${pageSize}&search=${search}&sort=${sortBy}&order=${order}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData(json.data || []);
      setTotal(json.total || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setTotal(0);
    } finally {
      setIsSearching(false);
    }
  };

  // Gọi fetchData khi pageIndex, pageSize, search, sortBy, hoặc order thay đổi
  useEffect(() => {
    // fetchData();
  }, [pageIndex, pageSize, search, sortBy, order]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      if (newSorting.length > 0) {
        setSortBy(newSorting[0].id);
        setOrder(newSorting[0].desc ? "desc" : "asc");
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(
          "sort",
          `${newSorting[0].id}.${newSorting[0].desc ? "desc" : "asc"}`
        );
        router.push(`${pathname}?${newSearchParams.toString()}`);
      } else {
        setSortBy("createdAt");
        setOrder("desc");
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("sort");
        router.push(`${pathname}?${newSearchParams.toString()}`);
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
    manualPagination: true,
    manualSorting: true,
    pageCount: Math.ceil(total / pageSize) || 1, // Đảm bảo pageCount ít nhất là 1
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", String(newPagination.pageIndex + 1));
      newSearchParams.set("pageSize", String(newPagination.pageSize));
      router.push(`${pathname}?${newSearchParams.toString()}`);
    },
  });

  const filterFields: DataTableFilterField<AdminComment>[] = [
    {
      label: "Tên bài học",
      value: "lessonName",
      placeholder: "Lọc theo tên bài học...",
    },
    {
      label: "Mô tả",
      value: "content",
      placeholder: "Lọc theo nội dung...",
    },
  ];

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="ml-2" onClick={fetchData} disabled={isSearching}>
            {isSearching ? "Loading..." : "Tìm"}
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Hiện cột
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {(column.columnDef.meta as { title?: string })?.title ||
                    column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination
          table={table}
          setPageSize={setPageSize}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
}
