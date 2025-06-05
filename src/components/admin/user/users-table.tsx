"use client"

import * as React from "react";
import { TableInstanceProvider } from "@/components/admin/share/data-table/table-instance-provider";
import { DataTable } from "@/components/admin/share/data-table/data-table";
import { DataTableFilterField } from "@/types/ui/data-table";
import { DataTableAdvancedToolbar } from "@/components/admin/share/data-table/advance/data-table-advance-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { UsersTableFloatingBar } from "./users-table-floating-bar";
import { UsersTableToolbarActions } from "./users-table-toolbar-actions";
import { getColumns } from "./users-table-column";


interface UsersTableProps {
  userPromise: Promise<UserPageResponse>;
}

export function UsersTable({ userPromise }: UsersTableProps) {
  const { result, totalPages } = React.use(userPromise);

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

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
        { label: "Quản Trị Viên", value: "ADMIN" },
        { label: "Học Viên", value: "CLIENT" },
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
  ];

  const { table } = useDataTable({
    data: Array.isArray(result) ? result : [],
    columns,
    pageCount: totalPages,
    filterFields,
    defaultPerPage: 10,
  });

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
  );
}