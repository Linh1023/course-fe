 
 "use client"
 
 import * as React from "react"
 
 import { useDataTable } from "@/hooks/use-data-table"
 import { DataTableFilterField } from "@/types/ui/data-table"
 import { TableInstanceProvider } from "@/components/admin/share/data-table/table-instance-provider"
 import { DataTable } from "@/components/admin/share/data-table/data-table"
 import { DataTableAdvancedToolbar } from "@/components/admin/share/data-table/advance/data-table-advance-toolbar"
import { getCourseProgressColumns } from "./course_progress_table_column"
 
 
 interface Props {
   courseProgressPromise:  Promise<CourseProgressPageResponse>
 }
 
 
 export function CourseProgressTable(props:Props) {
 
   const {courseProgressPromise} = props
 
     const {result, totalPages} = React.use(courseProgressPromise)
       console.log("courseProgressPromise >>> ", result)
 
   // cái này là từng dòng dữ liệu của bảng kể cả header
   const columns = React.useMemo(() => getCourseProgressColumns(), [])
 
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
   const filterFields: DataTableFilterField<CourseProgressResponse>[] = [
     {
       label: "Khóa học",
       value: "name",
       placeholder: "Lọc khóa học...",
     },
     {
       label: "Trạng thái",
       value: "status",
       placeholder: "Lọc theo trạng thái...",
       options: [
         { label: "Hoàn thành", value: "completed" },
         { label: "Đang học", value: "inProgress" },
       ],
     }
   ]
 
 
   const { table } = useDataTable({
     data : result, // dữ liệu đổ vào table
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
       >
         
         <DataTableAdvancedToolbar
          filterFields={filterFields}>
         
         </DataTableAdvancedToolbar>
       
       </DataTable>
 
 
     </TableInstanceProvider>
   )
 }
 