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
import { UpdateUserSheet } from "./update-user-sheet"
import { DeleteUsersDialog } from "./delete-users-dialog"
import { Ellipsis } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { User } from "@/types/response/account/user"

export function getColumns(): ColumnDef<User>[] {
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
        <DataTableColumnHeader column={column} title="Họ tên" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[15rem] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[20rem] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[10rem] truncate font-medium">
            {new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "sex",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giới tính" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[10rem] truncate font-medium">
            {row.getValue("sex") === "male" ? "Nam" : row.getValue("sex") === "female" ? "Nữ" : "Khác"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vai trò" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[10rem] truncate font-medium">
            <Badge
              variant={
                row.getValue("role") === "admin"
                  ? "default"
                  : row.getValue("role") === "instructor"
                  ? "secondary"
                  : "outline"
              }
            >
              {row.getValue("role") === "admin"
                ? "Admin"
                : row.getValue("role") === "instructor"
                ? "Giảng viên"
                : "Học viên"}
            </Badge>
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[10rem] truncate font-medium">
            <Badge
              variant={
                row.getValue("status") === "active" ? "secondary" : "destructive"
              }
            >
              {row.getValue("status") === "active" ? "Hoạt động" : "Ngưng hoạt động"}
            </Badge>
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateUserSheet, setShowUpdateUserSheet] = React.useState(false)
        const [showDeleteUserDialog, setShowDeleteUserDialog] = React.useState(false)

        return (
          <>
            <UpdateUserSheet
              open={showUpdateUserSheet}
              onOpenChange={setShowUpdateUserSheet}
              user={row.original}
            />
            <DeleteUsersDialog
              open={showDeleteUserDialog}
              onOpenChange={setShowDeleteUserDialog}
              users={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
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
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowUpdateUserSheet(true)
                    }, 0)
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowDeleteUserDialog(true)
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