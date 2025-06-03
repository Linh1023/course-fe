"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
// import { toast } from "sonner"
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
// import { UpdateCategorySheet } from "./update-category-sheet"
// import { DeleteCategoriesDialog } from "./delete-categories-dialog"
import { Ellipsis } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { UpdateSubmissionSheet } from "./update_submission_sheet"
export function getSubmissionColumns(): ColumnDef<SubmissionAdminResponse>[] {
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
      accessorKey: "submitterEmail",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {row.getValue("submitterEmail")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "submitterName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("submitterName")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "courseName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Khóa học" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("courseName")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "lessonName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bài học" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("lessonName")}
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
          <>

            <div className="flex space-x-2">
              <span className="max-w-[10rem] truncate font-medium">
                <Badge
                  variant={
                    row.getValue("status") === "graded"
                      ? "secondary"
                      : "destructive"
                  }>{row.getValue("status") === "submitted" ? "Chưa chấm" : "Đã chấm"}</Badge>
              </span>
            </div>


          </>
        )
      },
    },
    {
      accessorKey: "submittedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày nộp" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("submittedAt")}
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateSubmissionSheet, setShowUpdateSubmissionSheet] =
          React.useState(false)

        return (
          <>
            <UpdateSubmissionSheet
              showUpdateSubmissionSheet = {showUpdateSubmissionSheet}
              setShowUpdateSubmissionSheet = {setShowUpdateSubmissionSheet}
              submission={row.original}
            />
            {/* <DeleteCategoriesDialog
              open={showDeleteCategoryDialog}
              onOpenChange={setShowDeleteCategoryDialog}
              categories={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            /> */}
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
                    setShowUpdateSubmissionSheet(true)
                  }, 0)
                }}>
                  {row.original.status === "graded" ? "Chỉnh sửa" : "Chấm bài"}
                 
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}
