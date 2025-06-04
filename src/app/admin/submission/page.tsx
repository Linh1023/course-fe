import { SubmissionTable } from "@/components/admin/submission/submission_table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import React from "react"
import { ReadonlyURLSearchParams } from "next/navigation"
import { DateRangePicker } from "@/components/admin/share/data-table/advance/date-range-picker"
import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
// import { DateRangePicker } from "@/components/date-range-picker"
export interface SubmissionPageProps {
    searchParams: ReadonlyURLSearchParams
}

const SubmissionPage = async (props: SubmissionPageProps) => {
    const { searchParams } = props
    const query = new URLSearchParams(searchParams).toString();
    const submissionsPromise =  FetchServerGetApi(API.SUBMISSON.SUBMISSION + `?${query}`, "/admin/submission");
  
 

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="h-[100px] flex items-center justify-between gap-2">
                    <h1 className="text-xl font-semibold">Quản Lý Danh Mục</h1>
                </div>
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
                    <SubmissionTable 
                    submissionsPromise = {submissionsPromise}
                    />
                </React.Suspense>
            </div>
        </>
    )
}

export default SubmissionPage