import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { UsersTable } from "@/components/admin/user/users-table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import { ReadonlyURLSearchParams } from "next/navigation"
import React from "react"

export interface UserPageProps {
  searchParams: ReadonlyURLSearchParams;
}

const UserPage = async ({ searchParams }: UserPageProps) => {
  const query = new URLSearchParams(searchParams).toString();
  console.log("Query params:", query); // Debugging log

  const userPromise = FetchServerGetApi(
    `${API.ACCOUNT.ROOT}${query ? `?${query}` : ""}`,
    "/admin/user"
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[100px] flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Quản Lý Người Dùng</h1>
      </div>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={7}
            cellWidths={["5rem", "15rem", "20rem", "10rem", "10rem", "10rem", "5rem"]}
            shrinkZero
          />
        }
      >
        {/* Khoang tg - Comment vì không dùng cho Account */}
        {/* <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60 mr-1"
          className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/50"
          align="end"
        /> */}
        <UsersTable userPromise={userPromise} />
      </React.Suspense>
    </div>
  );
};

export default UserPage;