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
import { UpdateLessonSheet } from "./update-lesson-sheet"
import { DeleteLessonsDialog } from "./delete-lesson-dialog"
import { formatTime } from "@/utils/format_time"

interface getColumnsProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
   fetchData: () => Promise<void>
}

export function getColumns({ setIsLoading, fetchData }: getColumnsProps): ColumnDef<Lesson>[] {
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
      accessorKey: "lessonNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bài học số" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {row.getValue("lessonNumber")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên bài học" />
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
      accessorKey: "duration",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Thời lượng bài học" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {formatTime(row.getValue("duration"))}
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
        const [showUpdateLessonSheet, setShowUpdateLessonSheet] =
          React.useState(false)
        const [showDeleteLessonDialog, setShowDeleteLessonDialog] =
          React.useState(false)

        return (
          <>
            <UpdateLessonSheet
              setIsLoading={setIsLoading}
              open={showUpdateLessonSheet}
              onOpenChange={setShowUpdateLessonSheet}
              lesson={row.original}
              fetchData= {fetchData}
            />
            <DeleteLessonsDialog
              setIsLoading={setIsLoading}
              open={showDeleteLessonDialog}
              onOpenChange={setShowDeleteLessonDialog}
              lessons={[row.original]}
              showTrigger={false}
              onSuccess={() => {
                fetchData()
                toast.success(
                  `Đã xóa bài học "${row.original.name}" thành công!`
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
                <DropdownMenuItem onSelect={() => {
                  setTimeout(() => {
                    setShowUpdateLessonSheet(true)
                  }, 0)
                }}>
                  Sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowDeleteLessonDialog(true)
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
