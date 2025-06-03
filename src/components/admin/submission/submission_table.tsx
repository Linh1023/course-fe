"use client"

import * as React from "react"
import { TableInstanceProvider } from "../share/data-table/table-instance-provider"
import { DataTable } from "../share/data-table/data-table"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableFilterField } from "@/types/ui/data-table"
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar"
import { getSubmissionColumns } from "./submission_table_column"
import { SubmissionTableFloatingBar } from "./submission_table_floating_bar"
import { SubmissionTableToolbarActions } from "./submission_table_toolbar_actions"

interface Props {
  submissions:SubmissionAdminResponse[]
  totalPages:number
}

export function SubmissionTable(props:Props) {

  const {submissions, totalPages} = props

   

  // cái này là từng dòng dữ liệu của bảng kể cả header
  const columns = React.useMemo(() => getSubmissionColumns(), [])



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


  // khai bao nhung muc de filter
  const filterFields: DataTableFilterField<SubmissionAdminResponse>[] = [
    {
      label: "Khóa học",
      value: "courseName",
      placeholder: "Lọc khóa học...",
    },
    {
      label: "Bài học",
      value: "lessonName",
      placeholder: "Lọc tên bài học...",
    },
    {
      label: "Tên",
      value: "submitterName",
      placeholder: "Lọc tên học viên...",
    },
    {
      label: "Email",
      value: "submitterEmail",
      placeholder: "Lọc email học viên...",
    },
    {
      label: "Trạng thái",
      value: "status",
      placeholder: "Lọc theo trạng thái...",
      options: [
        { label: "Chưa chấm", value: "submitted" },
        { label: "Đã chấm", value: "graded" },
      ],
    }
  ]


  const { table } = useDataTable({
    data : submissions, // dữ liệu đổ vào table
    columns, // cái này là từng dòng dữ liệu của bảng kể cả header
    pageCount: totalPages, // tổng số trang
    filterFields, // bộ lọc
    defaultPerPage: 10, // tổng số phần tử trên 1 trang
  })

   const [isOpen, setIsOpen] = React.useState(false)

  return (
    <TableInstanceProvider table={table}>
     
      <DataTable
        table={table}
       
        // SubmissionTableFloatingBar cái này là cái button popup lên ở phía dưới màn hình khi mình chọn 1 dòng dữ liệu để xóa
        floatingBar={<SubmissionTableFloatingBar table={table} 
               isOpen = {isOpen}
          setIsOpen = {setIsOpen}
        />} 
      >
        
        <DataTableAdvancedToolbar filterFields={filterFields}>
        
        {/* SubmissionTableToolbarActions cái này là button nằm ở phía bên trái của filter dùng để xóa và tạo mới */}
          <SubmissionTableToolbarActions 
          isOpen = {isOpen}
          setIsOpen = {setIsOpen}
          table={table} />
        
        </DataTableAdvancedToolbar>
      
      </DataTable>


    </TableInstanceProvider>
  )
}
