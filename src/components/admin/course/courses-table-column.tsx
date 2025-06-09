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
import { UpdateCourseSheet } from "./update-course-sheet"
import { DeleteCoursesDialog } from "./delete-course-dialog"

interface getColumnsProps {
  listCategory: Category[]
}
export function getColumns({ listCategory }: getColumnsProps): ColumnDef<Course>[] {
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên khóa học" />
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
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Danh mục" />
      ),
      cell: ({ row }) => {
        const category = row.original.category;
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {category ? category.name : "Không có danh mục"}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {Number(row.getValue("price")).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
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
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateCategorySheet, setShowUpdateCategorySheet] =
          React.useState(false)
        const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] =
          React.useState(false)

        return (
          <>
            <UpdateCourseSheet
              open={showUpdateCategorySheet}
              onOpenChange={setShowUpdateCategorySheet}
              listCategory={listCategory}
              course={row.original}
            />
            <DeleteCoursesDialog
              open={showDeleteCategoryDialog}
              onOpenChange={setShowDeleteCategoryDialog}
              courses={[row.original]}
              showTrigger={false}
              onSuccess={() => {
                toast.success(
                  `Đã xóa khóa học "${row.original.name}" thành công!`
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
                    setShowUpdateCategorySheet(true)
                  }, 0)
                }}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowDeleteCategoryDialog(true)
                    }, 0)
                  }}
                >
                  Delete
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
