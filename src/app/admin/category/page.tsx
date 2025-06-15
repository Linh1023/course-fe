import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { CategoriesTable } from "@/components/admin/category/categories-table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import { ReadonlyURLSearchParams } from "next/navigation"
import React from "react"


const CategoryPage = async () => {

    return (
        <div className="flex flex-col gap-4">
            <div className="h-[100px] flex items-center justify-between gap-2">
                <h1 className="text-xl font-semibold">Quản Lý Danh Mục</h1>
            </div>

                <CategoriesTable  />
     
        </div>
    )
}

export default CategoryPage