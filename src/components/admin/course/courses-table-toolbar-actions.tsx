"use client"

import { type Table } from "@tanstack/react-table"

import { toast } from "sonner"
import { DeleteCoursesDialog } from "./delete-course-dialog"
import { CreateCourseDialog } from "./create-course-dialog"


interface CategoriesTableToolbarActionsProps {
  table: Table<Course>
  listCategory: Category[]
}

export function CoursesTableToolbarActions({
  table, listCategory
}: CategoriesTableToolbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteCoursesDialog
          courses={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} khóa học thành công!`
            )
            table.toggleAllRowsSelected(false)
          }
          }
        />
      ) : null}
      <CreateCourseDialog listCategory={listCategory} />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
