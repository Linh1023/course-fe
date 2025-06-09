"use server"

import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { DateRangePicker } from "@/components/admin/share/data-table/advance/date-range-picker"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import { SubmissionClientTable } from "@/components/client/submission/submission_client_table"
import { ReadonlyURLSearchParams } from "next/navigation"
import React from "react"

export interface SubmissionPageProps {
    searchParams: ReadonlyURLSearchParams

}


const SubmissionPage = async (props: SubmissionPageProps) => {


    const { searchParams } = props
    const query = new URLSearchParams(searchParams).toString();
    const submissionsPromise = FetchServerGetApi(API.SUBMISSON.SUBMISSION_CLIENT_FILTER + `?${query}`, "/profile/submission");

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-900 mt-[10px]  border-b border-gray-200 pb-[20px]">Bài tập của tôi</h1>
            <div className="flex flex-col gap-4">

                <React.Suspense fallback={<DataTableSkeleton
                    columnCount={3}
                    cellWidths={["5rem", "40rem", "12rem"]}
                    shrinkZero
                />} >
                    {/* Khoang tg */}
                    <DateRangePicker
                        triggerSize="sm"
                        triggerClassName="ml-auto w-56 sm:w-60 mr-1"
                        className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/50"
                        align="end"
                    />
                    <SubmissionClientTable
                        submissionsPromise={submissionsPromise}
                    />
                </React.Suspense>
            </div>
        </>
    )
}

export default SubmissionPage