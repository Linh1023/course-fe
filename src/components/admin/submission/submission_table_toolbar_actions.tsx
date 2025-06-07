"use client"

import { type Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DeleteSubmissionsDialog } from "./delete_submission_dialog"
// import { DeleteCategoriesDialog } from "./delete-categories-dialog"
// import { CreateCategoryDialog } from "./create-category-dialog"


interface SubmissionTableToolbarActionsProps {
  table: Table<SubmissionAdminResponse>
  isOpen: boolean, // giá trị để biết để Dialog bật tắt
  setIsOpen: (v: boolean) => void, // cái này để Dialog nó set bật tắt
  setIsLoading: (v: boolean) => void,
}

// SubmissionTableToolbarActions cái này là button nằm ở phía bên trái của filter dùng để xóa và tạo mới
export function SubmissionTableToolbarActions(props: SubmissionTableToolbarActionsProps) {
  const { table, isOpen, setIsOpen,  setIsLoading } = props

  return (
    <div className="flex items-center gap-2">

      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <>
          <DeleteSubmissionsDialog
            submissions={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            hanldeDeletedSuccess={() => table.toggleAllRowsSelected(false)}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            showTrigger={true}
             setIsLoading ={setIsLoading}
          />
        </>
      )}
      
      {/* <CreateCategoryDialog /> */}


      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
