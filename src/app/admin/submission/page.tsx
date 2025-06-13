
import { SubmissionTable } from "@/components/admin/submission/submission_table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import React from "react"
import { ReadonlyURLSearchParams } from "next/navigation"
import { DateRangePicker } from "@/components/admin/share/data-table/advance/date-range-picker"
import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"

const SubmissionPage = () => {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="h-[100px] flex items-center justify-between gap-2">
                    <h1 className="text-xl font-semibold">Quản Lý bài nộp</h1>
                </div>

                <SubmissionTable
                />
            </div>
        </>
    )
}

export default SubmissionPage