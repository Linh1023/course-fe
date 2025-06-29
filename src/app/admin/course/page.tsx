import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { CoursesTable } from "@/components/admin/course/courses-table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import React from "react"


const CoursePage = async () => {

  const categoryPromise = FetchServerGetApi(API.CATEGORY.ROOT + `?status=active.inactive`, "/admin");
  return (
    <div className="flex flex-col gap-4">
      <div className="h-[100px] flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Quản lý khóa học</h1>
      </div>
      <React.Suspense fallback={<DataTableSkeleton
        columnCount={5}
        cellWidths={["5rem", "35rem", "12rem", "5rem", "5rem"]}
        shrinkZero
      />} >
        <CoursesTable categoryPromise={categoryPromise} />
      </React.Suspense>
    </div>
  )
}

export default CoursePage