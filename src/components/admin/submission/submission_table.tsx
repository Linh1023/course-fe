"use client"

import * as React from "react"
import { TableInstanceProvider } from "../share/data-table/table-instance-provider"
import { DataTable } from "../share/data-table/data-table"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableFilterField } from "@/types/ui/data-table"
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar"
import { getColumns } from "./submission_table_column"
import { SubmissionTableFloatingBar } from "./submission_table_floating_bar"
import { SubmissionTableToolbarActions } from "./submission-table-toolbar-actions"



export function SubmissionTable() {
  // const { data, pageCount } = React.use(tasksPromise)
  const data: SubmissionResponse[] = [
    {
      id: "68348f31-8ba8-800d-a232-ef738453771b", // id bai nop
      courseName: "Khóa học làm giàu", // ten khoa hoc
      lessonName: "1. Đa cấp", // ten bai hoc

      submitterEmail: "nguyena@gmail.com",// email nguoi nop
      submitterName: "Nguyễn A", // ten nguoi nop
      submissionUrl: "https://bainop.pdf",

      graderEmail: "duongle@gmail.com",
      graderName: "Dương Lê",
      score: 7.5,
      comment: "Làm tốt lắm",
      reviewedAt: "12:01 22/06/2025",
      status: "ungraded", // trang thai
    },
  ] // Replace with actual data fetching logic  
  const pageCount = 1// Replace with actual page count logic
  // const views = React.use(viewsPromise)

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
  const filterFields: DataTableFilterField<SubmissionResponse>[] = [
    {
      label: "Bài học",
      value: "lessonName",
      placeholder: "Lọc tên bài học...",
    },
    {
      label: "Trạng thái",
      value: "status",
      placeholder: "Lọc theo trạng thái...",
    }
  ]

  // TODO: Replace with actual data fetching logic

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // optional props
    filterFields,
    defaultPerPage: 10,
    defaultSort: "lessonName.desc",
  })

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        floatingBar={<SubmissionTableFloatingBar table={table} />}
      >
        <DataTableAdvancedToolbar filterFields={filterFields}>
          <SubmissionTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  )
}
