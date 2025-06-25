"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "../share/data-table/data-table-column-header"
import { Ellipsis } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"
import { UpdateChapterSheet } from "./update-chapter-sheet"
import { DeleteChaptersDialog } from "./delete-chapter-dialog"

interface getColumnsProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

   fetchData: () => Promise<void>
}

export function getColumns({ setIsLoading,fetchData }: getColumnsProps): ColumnDef<Chapter>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "chapterNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Chương số" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {row.getValue("chapterNumber")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên chương" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "detail",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mô tả" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("detail")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              <Badge
                variant={
                  row.getValue("status") === "active"
                    ? "secondary"
                    : "destructive"
                }>{row.getValue("status") === "active" ? "Hoạt động" : "Ngưng hoạt động"}</Badge>
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showUpdateChapterSheet, setShowUpdateChapterSheet] =
          React.useState(false)
        const [showDeleteChapterDialog, setShowDeleteChapterDialog] =
          React.useState(false)

        return (
          <>
            <UpdateChapterSheet
              setIsLoading={setIsLoading}
              open={showUpdateChapterSheet}
              onOpenChange={setShowUpdateChapterSheet}
              chapter={row.original}
              fetchData= {fetchData}
            />
            <DeleteChaptersDialog
              setIsLoading={setIsLoading}
              open={showDeleteChapterDialog}
              onOpenChange={setShowDeleteChapterDialog}
              chapters={[row.original]}
              showTrigger={false}
              onSuccess={() => {
                fetchData()
                toast.success(
                  `Đã xóa chương "${row.original.name}" thành công!`
                )
                row.toggleSelected(false)
              }}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <Ellipsis className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 overflow-visible dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40"
              >
                <Link href={`/admin/course/${row.original.courseId}/chapter/${row.original.id}?page=1&perPage=10`}>
                  <DropdownMenuItem >
                    Xem bài học
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onSelect={() => {
                  setTimeout(() => {
                    setShowUpdateChapterSheet(true)
                  }, 0)
                }}>
                  Sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowDeleteChapterDialog(true)
                    }, 0)
                  }}
                >
                  Xóa
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}
