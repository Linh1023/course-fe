"use client"

import * as React from "react"
import { TableInstanceProvider } from "../share/data-table/table-instance-provider"
import { DataTable } from "../share/data-table/data-table"
import { getColumns } from "./categories-table-column"
import { CategoriesTableFloatingBar } from "./categories-table-floating-bar"
import { CategoriesTableToolbarActions } from "./categories-table-toolbar-actions"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableFilterField } from "@/types/ui/data-table"
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar"



export function CategoriesTable() {
  // const { data, pageCount } = React.use(tasksPromise)
  const data: Category[] = [
    { id: "1", name: 'Electronics', detail: 'Devices and gadgets' },
    { id: "2", name: 'Books', detail: 'Literature and educational materials' },
    { id: "3", name: 'Clothing', detail: 'Apparel and fashion items' },
    { id: "4", name: 'Home & Kitchen', detail: 'Household items and kitchenware' },
    { id: "5", name: 'Sports & Outdoors', detail: 'Equipment for sports and outdoor activities' },
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
  const filterFields: DataTableFilterField<Category>[] = [
    {
      label: "Tên danh mục",
      value: "name",
      placeholder: "Lọc tên danh mục...",
    },
    {
      label: "Mô tả",
      value: "detail",
      placeholder: "Lọc theo mô tả danh mục...",
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
    defaultSort: "name.desc",
  })

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        floatingBar={<CategoriesTableFloatingBar table={table} />}
      >
        <DataTableAdvancedToolbar filterFields={filterFields}>
          <CategoriesTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  )
}
