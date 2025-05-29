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
    const query = new URLSearchParams(searchParams).toString();
    const categoryPromise = FetchServerGetApi(API.CATEGORY.ROOT + `?${query}`);
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
                {/* Khoang tg */}
                {/* <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60 mr-1"
          className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/50"
          align="end"
        /> */}
                <CategoriesTable categoryPromise={categoryPromise} />
            </React.Suspense>
        </div>
    )
}

export default CategoryPage