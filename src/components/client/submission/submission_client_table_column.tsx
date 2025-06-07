"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
// import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { UpdateCategorySheet } from "./update-category-sheet"
// import { DeleteCategoriesDialog } from "./delete-categories-dialog"
import { Ellipsis } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/admin/share/data-table/data-table-column-header"
import { SubmissionCommentDialog } from "./submission_comment_dialog"
import { set } from "date-fns"

export function getSubmissionClientColumns(): ColumnDef<SubmissionClientResponse>[] {
    return [

        {
            accessorKey: "courseName",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Khóa học" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("courseName")}
                        </span>
                    </div>
                )
            },
        },

        {
            accessorKey: "lessonName",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Bài học" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("lessonName")}
                        </span>
                    </div>
                )
            },
        },

        // {
        //   accessorKey: "submissionUrl",
        //   header: ({ column }) => (
        //     <DataTableColumnHeader column={column} title="File nộp" />
        //   ),
        //   cell: ({ row }) => {
        //     return (
        //       <div className="flex space-x-2">
        //         <span className="max-w-[31.25rem] truncate font-medium">
        //           {row.getValue("submissionUrl")}
        //         </span>
        //       </div>
        //     )
        //   },
        // },


        // {
        //   accessorKey: "score",
        //   header: ({ column }) => (
        //     <DataTableColumnHeader column={column} title="Điểm" />
        //   ),
        //   cell: ({ row }) => {
        //     return (
        //       <div className="flex space-x-2">
        //         <span className="max-w-[31.25rem] truncate font-medium">
        //           {row.getValue("score")}
        //         </span>
        //       </div>
        //     )
        //   },
        // },



        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Trạng thái" />
            ),
            cell: ({ row }) => {
                return (
                    <>

                        <div className="flex space-x-2">
                            <span className="max-w-[10rem] truncate font-medium">
                                <Badge
                                    variant={
                                        row.getValue("status") === "graded"
                                            ? "secondary"
                                            : "destructive"
                                    }>{row.getValue("status") === "submitted" ? "Chưa chấm" : "Đã chấm"}</Badge>
                            </span>
                        </div>


                    </>
                )
            },
        },
        {
            accessorKey: "submittedAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Ngày nộp" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("submittedAt")}
                        </span>
                    </div>
                )
            },
        },

        {
            id: "actions",
            cell: function Cell({ row }) {

                const [isOpen, setIsOpen] =
                    React.useState(false)

                return (
                    <>
                        <SubmissionCommentDialog
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            submission={row.original}
                        />
                        {/* <DeleteCategoriesDialog
                  open={showDeleteCategoryDialog}
                  onOpenChange={setShowDeleteCategoryDialog}
                  categories={[row.original]}
                  showTrigger={false}
                  onSuccess={() => row.toggleSelected(false)}
                /> */}
                        <Button
                            aria-label="Open menu"
                            variant="ghost"
                            className="flex size-8 p-0 data-[state=open]:bg-muted "
                            onClick={
                                () => {setIsOpen(true)}
                            }
                        >
                            {/* <Ellipsis className="size-4" aria-hidden="true" /> */}
                           
                           <div className="bg-gray-200 p-1 rounded-[5px]"> Chi tiết</div>
                           
                        </Button>
                    </>
                )
            },
        },
    ]
}
