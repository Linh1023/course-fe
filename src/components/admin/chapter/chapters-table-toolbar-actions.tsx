"use client"

import { type Table } from "@tanstack/react-table"

import { toast } from "sonner"
import { CreateChapterDialog } from "./create-chapter-dialog"
import { DeleteChaptersDialog } from "./delete-chapter-dialog"


interface ChaptersTableToolbarActionsProps {
  table: Table<Chapter>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  courseId: string
  fetchData: () => void

}


export function ChaptersTableToolbarActions({
  table, courseId, setIsLoading, fetchData
}: ChaptersTableToolbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteChaptersDialog
          setIsLoading={setIsLoading}
          chapters={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            fetchData()
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} chương thành công!`
            )
            table.toggleAllRowsSelected(false)
          }
          }
        />
      ) : null}
      <CreateChapterDialog setIsLoading={setIsLoading} courseId={courseId} 
      fetchData = {fetchData}
      
      />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
