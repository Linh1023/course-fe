"use client"

import * as React from "react"
import { TableInstanceProvider } from "../share/data-table/table-instance-provider"
import { DataTable } from "../share/data-table/data-table"
import { getColumns } from "./course_enrollment-table-column"
import { CESTableFloatingBar } from "./course_enrollment-table-floating-bar"
import { CESTableToolbarActions } from "./course_enrollment-table-toolbar-actions"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableFilterField } from "@/types/ui/data-table"
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar"
interface CESTableProps {
  courseEnrollmentPromise: Promise<CourseEnrollmentResponse>
}


export function CourseEnrollmentTable({ courseEnrollmentPromise }: CESTableProps) {
  const { result, totalPages } = React.use(courseEnrollmentPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<CourseEnrollment>[] = [
    {
      label: "Tên người dùng",
      value: "accountName",
      placeholder: "Lọc tên danh mục...",
    },
    {
      label: "Tên khóa học",
      value: "courseName",
      placeholder: "Lọc theo mô tả danh mục...",
    }
    // {
    //   label: "Ngày đăng ký",
    //   value: "enrolledAt",
    //   placeholder: "Lọc theo trạng thái...",
    //   options: [
    //     { label: "Hoạt động", value: "active" },
    //     { label: "Không hoạt động", value: "inactive" },
    //   ],
    // }
  ]

  // TODO: Replace with actual data fetching logic
  const { table } = useDataTable({
    data: result,
    columns,
    pageCount: totalPages,
    // optional props
    filterFields,
    defaultPerPage: 10,
  })
  
  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        floatingBar={<CESTableFloatingBar table={table} />}
      >
        <DataTableAdvancedToolbar filterFields={filterFields}>
          <CESTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  )
}
