"use client"

import { type Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { DeleteCommentsDialog } from "./delete-comments-dialog"


interface CommentsTableToolbarActionsProps {
  table: Table<TypeComment>
}

export function CommentsTableToolbarActions({
  table,
}: CommentsTableToolbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteCommentsDialog
          comments={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} bình luận thành công!`
            )
            table.toggleAllRowsSelected(false)
          }
          }
        />
      ) : null}
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
