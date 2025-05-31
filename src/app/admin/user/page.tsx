import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { UsersTable } from "@/components/admin/user/users-table"
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import { ReadonlyURLSearchParams } from "next/navigation"
import React from "react"
import { redirect } from "next/navigation"

export interface UserPageProps {
  searchParams: ReadonlyURLSearchParams
}

const UserPage = async ({ searchParams }: UserPageProps) => {
  // Parse searchParams
  const params = new URLSearchParams(searchParams);
  let page = parseInt(params.get("page") || "1", 10);
  if (isNaN(page) || page < 1) page = 1;
  // Điều chỉnh page: frontend 1-based -> backend 0-based
  params.set("page", (page - 1).toString());
  const query = params.toString();

  // console.log("Query params:", query); 

  const userPromise = FetchServerGetApi(`${API.ACCOUNT.ROOT}${query ? `?${query}` : ""}`, "/admin/user")
    .then((res) => {
      // console.log("Raw API response:", JSON.stringify(res, null, 2)); // Debug response
      if (
        !res ||
        res.status !== 200 ||
        !res.result ||
        !res.result.meta ||
        !Array.isArray(res.result.result)
      ) {
        console.error("API trả về dữ liệu không hợp lệ:", res);
        return { result: [], totalPages: 0 };
      }

      const totalPages = res.result.meta.pages || 0;
      // Kiểm tra page hợp lệ
      if (page > totalPages && totalPages > 0) {
        console.warn(`Page ${page} vượt quá tổng số trang (${totalPages})`);
        redirect(`/admin/user?page=1`);
      }

      return {
        result: res.result.result, // Danh sách người dùng
        totalPages, // Tổng số trang
      };
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