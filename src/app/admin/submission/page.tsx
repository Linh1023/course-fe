import { SubmissionTable } from "@/components/admin/submission/submission_table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import React from "react"
const SubmissionPage = () => {
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
                    {/* <DateRangePicker
                 triggerSize="sm"
                 triggerClassName="ml-auto w-56 sm:w-60 mr-1"
                 className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/50"
                 align="end"
               /> */}
                    <SubmissionTable />
                </React.Suspense>
            </div>
        </>
    )
}

export default SubmissionPage