"use client"

import { type Table } from "@tanstack/react-table"

// import { DeleteCESDialog } from "./delete-ces-dialog"
// import { CreateCEDialog } from "./create-ce-dialog"
import { toast } from "sonner"


interface CESTableToolbarActionsProps {
  table: Table<CourseEnrollmentAdmin>
}

export function CESTableToolbarActions({
  table,
}: CESTableToolbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteCESDialog
          ces={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} danh mục thành công!`
            )
            table.toggleAllRowsSelected(false)
          }
          }
        />
      ) : null}
      <CreateCEDialog /> */}
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
