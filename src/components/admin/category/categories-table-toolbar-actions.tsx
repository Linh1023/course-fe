"use client"

import { type Table } from "@tanstack/react-table"

import { DeleteCategoriesDialog } from "./delete-categories-dialog"
import { CreateCategoryDialog } from "./create-category-dialog"
import { toast } from "sonner"


interface CategoriesTableToolbarActionsProps {
  table: Table<Category>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  fetchData:()=>void
}

export function CategoriesTableToolbarActions({
  table, setIsLoading,
  fetchData
}: CategoriesTableToolbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteCategoriesDialog
          setIsLoading={setIsLoading}
          categories={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            fetchData()
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} danh mục thành công!`
            )
            table.toggleAllRowsSelected(false)
          }
          }
        />
      ) : null}
      <CreateCategoryDialog setIsLoading={setIsLoading} 
      fetchData= {fetchData}
      />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
