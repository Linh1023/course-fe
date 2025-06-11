import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { CategoriesTable } from "@/components/admin/category/categories-table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import { ReadonlyURLSearchParams } from "next/navigation"
import React from "react"

export interface CategoryPageProps {
    searchParams: ReadonlyURLSearchParams
}

const CategoryPage = async ({ searchParams }: CategoryPageProps) => {
    const params = new URLSearchParams(searchParams);
    if (!params.has("page")) {
        params.set("page", "1");
    }
    const query = params.toString();
    const categoryPromise = FetchServerGetApi(API.CATEGORY.ROOT + `?${query}`, "/admin/category");
    return (
        <div className="flex flex-col gap-4">
            <div className="h-[100px] flex items-center justify-between gap-2">
                <h1 className="text-xl font-semibold">Quản Lý Danh Mục</h1>
            </div>
            <React.Suspense fallback={<DataTableSkeleton
                columnCount={4}
                cellWidths={["5rem", "40rem", "12rem", "5rem"]}
                shrinkZero
            />} >
                <CategoriesTable categoryPromise={categoryPromise} />
            </React.Suspense>
        </div>
    )
}

export default CategoryPage