"use client"

import * as React from "react"
import { TableInstanceProvider } from "../share/data-table/table-instance-provider"
import { DataTable } from "../share/data-table/data-table"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableFilterField } from "@/types/ui/data-table"
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar"
import { getColumns } from "./lessons-table-column"
import { LessonsTableFloatingBar } from "./lessons-table-floating-bar"
import { LessonsTableToolbarActions } from "./lessons-table-toolbar-actions"

interface LessonsTableProps {
  lessonPromise: Promise<LessonPageResponse>
  chapterId: number
}

export function LessonsTable({ lessonPromise, chapterId }: LessonsTableProps) {
  const { result: data, totalPages } = React.use(lessonPromise)
  const [isLoading, setIsLoading] = React.useState(false)


  React.useEffect(() => {
    setIsLoading(false)
  }, [data, totalPages])
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns({ setIsLoading }), [setIsLoading])

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
  const filterFields: DataTableFilterField<Lesson>[] = [
    {
      label: "Tên bài học",
      value: "name",
      placeholder: "Lọc tên bài học...",
    },
    {
      label: "Mô tả",
      value: "detail",
      placeholder: "Lọc theo mô tả bài học...",
    },
    {
      label: "Trạng thái",
      value: "status",
      placeholder: "Lọc theo trạng thái...",
      options: [
        { label: "Hoạt động", value: "active" },
        { label: "Không hoạt động", value: "inactive" },
      ],
    }
  ]
  //  [
  //       {
  //         id: "1",
  //         lessonNumber: 1,
  //         name: "Bài học 1",
  //         detail: "Mô tả bài học 1",
  //         duration: 300,
  //         status: "active",
  //         videoUrl: "",
  //         documentUrl: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
  //         assigmentUrl: "https://example.com/assignment1.docx",
  //         chapterId: 1,
  //       }
  //     ]
  // TODO: Replace with actual data fetching logic
  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: totalPages || 1,
    // optional props
    filterFields,
    defaultPerPage: 10,
  })

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        isLoading={isLoading}
        floatingBar={<LessonsTableFloatingBar table={table} setIsLoading={setIsLoading} />}
      >
        <DataTableAdvancedToolbar filterFields={filterFields} setIsLoading={setIsLoading}>
          <LessonsTableToolbarActions table={table} setIsLoading={setIsLoading} chapterId={chapterId} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  )
}
