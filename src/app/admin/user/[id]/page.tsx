"use server"

import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { CourseProgressTable } from "@/components/admin/courseprogress/course_progress_table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ReadonlyURLSearchParams } from "next/navigation"
import React from "react"

export interface CourseProgressProps {
    searchParams: ReadonlyURLSearchParams
    params: { id: string }
}

const CourseProgress = async ({ params, searchParams }: CourseProgressProps) => {
    const { id } = params;
    const query = new URLSearchParams(searchParams).toString();
    const courseProgressPromise = FetchServerGetApi(API.ACCOUNT.COURSE_PROGRESS + `/${id}?${query}`, `/admin/user/${id}`);


    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="h-[100px] flex items-center gap-6">
                    <Link href="/admin/user">
                        <Button className="" ><ArrowLeft /></Button>  
                    </Link>
                     <h1 className="text-xl font-semibold">Tiến độ</h1>
                </div>
                <React.Suspense fallback={<DataTableSkeleton
                    columnCount={3}
                    cellWidths={["5rem", "40rem", "12rem"]}
                    shrinkZero
                />} >

                    <CourseProgressTable
                        courseProgressPromise={courseProgressPromise}
                    />
                </React.Suspense>
            </div>
        </>
    )
}
export default CourseProgress   