import * as React from "react"
import { type Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { TrashIcon, X } from "lucide-react"
import { toast } from "sonner"
import { DeleteCommentsDialog } from "./delete-comments-dialog"

interface CommentsTableFloatingBarProps {
  table: Table<CommentAdmin>
}

export function CommentsTableFloatingBar({ table }: CommentsTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteCommentsDialog
          open={isOpen}
          onOpenChange={setIsOpen}
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
          showTrigger={false}
        />
      ) : null}
      <div className="w-full overflow-x-auto">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
          <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">
            <span className="whitespace-nowrap text-xs">
              {rows.length} selected
            </span>
            <Separator orientation="vertical" className="ml-2 mr-1" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5 hover:border"
                  onClick={() => table.toggleAllRowsSelected(false)}
                >
                  <X
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40">
                <p className="mr-2">Clear selection</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation="vertical" className="hidden h-5 sm:block" />
          <div className="flex items-center gap-1.5">
            <Tooltip delayDuration={250}>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-7 border"
                  onClick={() => {
                    setIsOpen(true)
                  }}
                >
                  <TrashIcon className="size-3.5" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40">
                <p>Xóa bình luận</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
