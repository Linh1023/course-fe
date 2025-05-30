import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import ACCOUNT_API from '@/api/endpoints/account'
import { UsersTable } from "@/components/admin/user/users-table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import { ReadonlyURLSearchParams } from "next/navigation"
import React from "react"

export interface UserPageProps {
  searchParams: ReadonlyURLSearchParams
}

const UserPage = async ({ searchParams }: UserPageProps) => {
  const query = new URLSearchParams(searchParams).toString();
  const userPromise = FetchServerGetApi(`${ACCOUNT_API.ROOT}?${query}`, "/admin/user")
    .then((res) => {
      if (res.status !== 200 || !Array.isArray(res.data.result)) {
        console.error("API trả về dữ liệu không hợp lệ:", res.data);
        return { result: [], totalPages: 0 };
      }
      return res.data;
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      return { result: [], totalPages: 0 };
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[100px] flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Quản Lý Người Dùng</h1>
      </div>
      <React.Suspense fallback={<DataTableSkeleton
        columnCount={7}
        cellWidths={["5rem", "15rem", "20rem", "10rem", "10rem", "10rem", "5rem"]}
        shrinkZero
      />}>
        <UsersTable userPromise={userPromise} />
      </React.Suspense>
    </div>
  )
}

export default UserPage