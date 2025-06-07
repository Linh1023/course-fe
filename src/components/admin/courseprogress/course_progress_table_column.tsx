"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/admin/share/data-table/data-table-column-header"

import { set } from "date-fns"

export function getCourseProgressColumns(): ColumnDef<CourseProgressResponse>[] {
    return [


        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Khóa học" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("name")}
                        </span>
                    </div>
                )
            },
        },

        {
            accessorKey: "viewedLessons",
            header: () => null,
            cell: () => null,
            enableColumnFilter: false,
            enableSorting: false,
            enableHiding: true,
        },

        {
            accessorKey: "totalLessons",
            header: () => null,
            cell: () => null,
            enableColumnFilter: false,
            enableSorting: false,
            enableHiding: true,
        },


        {
            accessorKey: "progress",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tiến độ" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {`${row.getValue("viewedLessons")}/${row.getValue("totalLessons")}`}
                        </span>
                    </div>
                )
            },
        },



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
                                        row.getValue("status") === "completed"
                                            ? "secondary"
                                            : "destructive"
                                    }>{row.getValue("status") === "inProgress" ? "Đang học" : "Hoàn thành"}</Badge>
                            </span>
                        </div>


                    </>
                )
            },
        },

        {
            accessorKey: "enrolledAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Ngày đăng ký" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("enrolledAt")}
                        </span>
                    </div>
                )
            },
        },
    ]
}
