"use client"

import { type Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DeleteUsersDialog } from "./delete-users-dialog"
import { CreateUserDialog } from "./create-user-dialog"
import { toast } from "sonner"

interface UsersTableToolbarActionsProps {
  table: Table<User>
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteUsersDialog
          users={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} người dùng thành công!`
            )
            table.toggleAllRowsSelected(false)
          }}
        />
      ) : null}
      <CreateUserDialog />
    </div>
  )
}