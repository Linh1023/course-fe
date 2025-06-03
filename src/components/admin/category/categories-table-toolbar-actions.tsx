"use client"

import { type Table } from "@tanstack/react-table"

import { DeleteCategoriesDialog } from "./delete-categories-dialog"
import { CreateCategoryDialog } from "./create-category-dialog"
import { toast } from "sonner"


interface CategoriesTableToolbarActionsProps {
  table: Table<Category>
}

export function CategoriesTableToolbarActions({
  table,
}: CategoriesTableToolbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteCategoriesDialog
          categories={table
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
      <CreateCategoryDialog />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
