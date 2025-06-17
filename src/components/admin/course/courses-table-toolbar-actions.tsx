"use client"

import { type Table } from "@tanstack/react-table"

import { toast } from "sonner"
import { DeleteCoursesDialog } from "./delete-course-dialog"
import { CreateCourseDialog } from "./create-course-dialog"


interface CoursesTableToolbarActionsProps {
  table: Table<Course>
  listCategory: Category[]
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

  fetchData:() =>void
}

export function CoursesTableToolbarActions({
  table, listCategory, setIsLoading, fetchData
}: CoursesTableToolbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteCoursesDialog
          setIsLoading={setIsLoading}
          courses={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {

            fetchData()
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} khóa học thành công!`
            )
            table.toggleAllRowsSelected(false)
          }
          }
        />
      ) : null}
      <CreateCourseDialog listCategory={listCategory} setIsLoading={setIsLoading} 
      fetchData = {fetchData}
      />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
