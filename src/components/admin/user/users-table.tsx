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
import { UserPageResponse } from "@/types/response/account/user"

interface UsersTableProps {
  userPromise: Promise<UserPageResponse>
}

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  status: "active" | "inactive";
  role: "admin" | "instructor" | "student";
  name: string;
  sex: "male" | "female" | "other";
  birthday: string;
}

export function UsersTable({ userPromise }: UsersTableProps) {
  const { result, totalPages } = React.use(userPromise)

  // Kiểm tra dữ liệu
  if (!Array.isArray(result)) {
    console.error("Dữ liệu người dùng không hợp lệ:", result);
    return <div>Lỗi: Dữ liệu không hợp lệ</div>;
  }

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
        { label: "Nam", value: "male" },
        { label: "Nữ", value: "female" },
        { label: "Khác", value: "other" },
      ],
    },
    {
      label: "Vai trò",
      value: "role",
      placeholder: "Lọc theo vai trò...",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Giảng viên", value: "instructor" },
        { label: "Học viên", value: "student" },
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
    data: result || [],
    columns,
    pageCount: totalPages || 0,
    filterFields,
    defaultPerPage: 10,
  })

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