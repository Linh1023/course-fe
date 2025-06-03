"use client"
// import * as React from "react"
import { type Table } from "@tanstack/react-table"
// import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { TrashIcon, X } from "lucide-react"
import { LoaderIcon } from "@/components/share/loading-icon"
import { useState } from "react"
import { DeleteSubmissionsDialog } from "./delete_submission_dialog"
import { toast } from "sonner"
import { set } from "zod"

interface SubmissionTableFloatingBarProps {
  table: Table<SubmissionAdminResponse>
    isOpen: boolean, // giá trị để biết để Dialog bật tắt
  setIsOpen: (v: boolean) => void, // cái này để Dialog nó set bật tắt
}

// cái này là cái popup lên ở phía dưới màn hình khi mình chọn 1 dòng dữ liệu để xóa
export function SubmissionTableFloatingBar(props: SubmissionTableFloatingBarProps) {

  const { table, setIsOpen, isOpen } = props
  const rows = table.getFilteredSelectedRowModel().rows // số lượng hàng đã được chọn

 

  const hanldeDeletedSuccess = () => {
    table.toggleAllRowsSelected(false)
    toast.success(
      `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} danh mục thành công!`
    )

  }

  const handleOpenDeleteDialog = () => {
    setIsOpen(true)
    console.log("click xoa")
  }




  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4">


      <DeleteSubmissionsDialog
        submissions={table
          .getFilteredSelectedRowModel()
          .rows.map((row) => row.original)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hanldeDeletedSuccess={hanldeDeletedSuccess}
      />


      <div className="w-full overflow-x-auto">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
          <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">

            {/* tổng số hàng đã chọn */}
            <span className="whitespace-nowrap text-xs">
              {rows.length} Đã chọn
            </span>

            <Separator orientation="vertical" className="ml-2 mr-1" />

            {/* bỏ chọn hết các hàng đã được họn */}
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

          {/* sự kiện xóa hết các hàng đã chọn */}
          <div className="flex items-center gap-1.5">
            <Tooltip delayDuration={250}>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-7 border"
                  onClick={() => {
                    handleOpenDeleteDialog()
                  }}
                >
                  <TrashIcon className="size-3.5" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40">
                <p>Xóa bài nộp</p>
              </TooltipContent>
            </Tooltip>
          </div>

        </div>
      </div>
    </div>
  )
}
