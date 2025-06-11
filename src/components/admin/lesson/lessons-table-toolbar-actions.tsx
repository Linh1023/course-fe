"use client"

import { type Table } from "@tanstack/react-table"

import { toast } from "sonner"
import { DeleteLessonsDialog } from "./delete-lesson-dialog"
import { CreateLessonDialog } from "./create-lesson-dialog"


interface LessonsTableToolbarActionsProps {
  table: Table<Lesson>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  chapterId: number
}

export function LessonsTableToolbarActions({
  table, chapterId, setIsLoading
}: LessonsTableToolbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteLessonsDialog
          setIsLoading={setIsLoading}
          lessons={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} bài học thành công!`
            )
            table.toggleAllRowsSelected(false)
          }
          }
        />
      ) : null}
      <CreateLessonDialog setIsLoading={setIsLoading} chapterId={chapterId} />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
