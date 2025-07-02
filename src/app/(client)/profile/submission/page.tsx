"use server"

import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { DateRangePicker } from "@/components/admin/share/data-table/advance/date-range-picker"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import { SubmissionClientTable } from "@/components/client/submission/submission_client_table"
import { ReadonlyURLSearchParams } from "next/navigation"
import React from "react"

const SubmissionPage = async () => {

    return (
        <>
            <h1 className="p-4 md:p-0 md:mb-2 md:pb-2 text-lg font-semibold text-gray-900 md:mt-[18px] border-b border-gray-200">Bài tập của tôi</h1>
            
            <div className="text-gray-500 p-4">Click  vào chi tiết hoặc tên khóa học để xem điểm số (Bạn có thể tìm kiếm bằng filter)</div>
            
            <div className="flex flex-col gap-4">
                <SubmissionClientTable

                />

            </div>
        </>
    )
}

export default SubmissionPage