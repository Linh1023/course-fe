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
import Link from "next/link";

export function getColumns(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,  
  fetchData: () => Promise<void>): ColumnDef<User>[] {
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
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <span className="max-w-[15rem] truncate font-medium">
                {user.name}
              </span>
            </div>
          </div>
        );
      },
      enableSorting: true,
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
      enableSorting: true,
    },
    {
      accessorKey: "username", 
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tài khoản" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[10rem] truncate font-medium">
            {row.getValue("username") || "—"}
          </span>
        </div>
      ),
      enableSorting: false,
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
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vai trò" />
      ),
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              <Badge
                variant={
                  role === "ADMIN"
                    ? "default"
                    : role === "CLIENT"
                    ? "secondary"
                    : "outline"
                }
              >
                {role === "ADMIN"
                  ? "Quản Trị Viên"
                  : role === "CLIENT"
                  ? "Học Viên"
                  : "Khác"}
              </Badge>
            </span>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              <Badge
                variant={status === "active" ? "secondary" : "destructive"}
                className="flex items-center gap-1"
              >
                <div className={`w-2 h-2 rounded-full ${
                  status === "active" ? "bg-green-500" : "bg-red-500"
                }`} />
                {status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </Badge>
            </span>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateUserSheet, setShowUpdateUserSheet] = React.useState(false)
        const [showDeleteUserDialog, setShowDeleteUserDialog] = React.useState(false)

        const user = row.original;

        return (
          <>
            <UpdateUserSheet
              open={showUpdateUserSheet}
              onOpenChange={setShowUpdateUserSheet}
              user={row.original}
              setIsLoading={setIsLoading}
              fetchData = {fetchData}
            />
            <DeleteUsersDialog
              open={showDeleteUserDialog}
              onOpenChange={setShowDeleteUserDialog}
              users={[row.original]}
              showTrigger={false}
              onSuccess={() => {
                fetchData()
                row.toggleSelected(false)
                setIsLoading(true)
              }}
              setIsLoading={setIsLoading}
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
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowDeleteUserDialog(true)
                    }, 0)
                  }}
                  className="text-red-600"
                >
                  Xóa
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={`/admin/user/${user.id}?page=1&perPage=10`} className="text-blue-600">
                  <DropdownMenuItem>
                    Xem tiến độ
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}