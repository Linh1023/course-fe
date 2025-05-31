"use client"

import * as React from "react"
import { TableInstanceProvider } from "../share/data-table/table-instance-provider"
import { DataTable } from "../share/data-table/data-table"
import { getColumns } from "./users-table-column"
import { UsersTableFloatingBar } from "./users-table-floating-bar"
import { UsersTableToolbarActions } from "./users-table-toolbar-actions"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableFilterField } from "@/types/ui/data-table"
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar"


interface UsersTableProps {
  userPromise: Promise<UserPageResponse>
}

export function UsersTable({ userPromise }: UsersTableProps) {
  const { result, totalPages, totalItems, currentPage } = React.use(userPromise)

  // Di chuyển useMemo và useDataTable lên top-level
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<User>[] = [
    {
      label: "Họ tên",
      value: "name",
      placeholder: "Lọc theo họ tên...",
    },
    {
      label: "Email",
      value: "email",
      placeholder: "Lọc theo email...",
    },
    {
      label: "Giới tính",
      value: "sex",
      placeholder: "Lọc theo giới tính...",
      options: [
        { label: "Nam", value: "MALE" },
        { label: "Nữ", value: "FEMALE" },
        { label: "Khác", value: "OTHER" },
      ],
    },
    {
      label: "Vai trò",
      value: "role",
      placeholder: "Lọc theo vai trò...",
      options: [
        { label: "Admin", value: "ADMIN" },
        { label: "Khách hàng", value: "CLIENT" },
      ],
    },
    {
      label: "Trạng thái",
      value: "status",
      placeholder: "Lọc theo trạng thái...",
      options: [
        { label: "Hoạt động", value: "active" },
        { label: "Ngưng hoạt động", value: "inactive" },
      ],
    },
  ]

  const { table } = useDataTable({
    data: Array.isArray(result) ? result : [],
    columns,
    pageCount: totalPages,
    filterFields,
    defaultPerPage: 20,
    // Removed initialState as it is not a valid property of UseDataTableProps
  })

  // Xử lý lỗi hoặc dữ liệu rỗng sau khi gọi Hooks
  if (!Array.isArray(result)) {
    console.error("Dữ liệu người dùng không hợp lệ:", result);
    return (
      <div className="text-center text-red-500 py-4">
        Lỗi: Dữ liệu người dùng không hợp lệ
      </div>
    );
  }

  if (result.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        Không có dữ liệu người dùng để hiển thị
      </div>
    );
  }

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        floatingBar={<UsersTableFloatingBar table={table} />}
      >
        <DataTableAdvancedToolbar filterFields={filterFields}>
          <UsersTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  )
}