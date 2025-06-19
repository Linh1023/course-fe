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
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { FetchClientGetApiSignalNoToken } from "@/actions/client/fetch_client_api"
import API from "@/api/api"


export function CategoriesTable() {



  const [isLoading, setIsLoading] = React.useState(false)
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [dataResult, setDataResult] = React.useState<Category[]>([])
  const [totalPages, setTotalPages] = React.useState(1)
  const router = useRouter()
  const abortControllerRef = React.useRef<AbortController | null>(null); // Use ref to keep track of the controller

  const [querySearch, setQuerySearch] = React.useState(() => searchParams.toString());


  React.useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, [querySearch]);


  const fetchData = async () => {
    // Huỷ request cũ nếu còn
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const { signal } = abortController;

    try {
      const submissions = await FetchClientGetApiSignalNoToken(
        `/api/proxy/search?${querySearch}&api=${API.CATEGORY.ROOT}`,
        signal
      );


      if (submissions?.status === 200) {
        setDataResult(submissions.result);
        setTotalPages(submissions.totalPages);

        //  Chỉ chạy nếu không bị huỷ
        console.log("fetch >>> ", `${pathName}?${querySearch}`);
        router.replace(`${pathName}?${querySearch}`, {
          scroll: false,
        });
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Yêu cầu bị huỷ, không làm gì cả
        return;
      } else {
        console.error('Lỗi khi fetch:', err);
      }
    } finally {
      // ✅ Luôn setIsLoading(false) nếu không bị huỷ
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };




  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns({ setIsLoading, fetchData }), [])

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

  const { table } = useDataTable({
    data: dataResult,
    columns,
    pageCount: totalPages || 1,
    // optional props
    filterFields,
    defaultPerPage: 10,
    setQuerySearch: setQuerySearch,
    querySearch: querySearch,
    setIsLoading:setIsLoading
  })

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setQuerySearch={setQuerySearch}
        querySearch={querySearch}
        floatingBar={<CategoriesTableFloatingBar table={table}
          setIsLoading={setIsLoading}
          fetchData={fetchData}
        />}
      >
        <DataTableAdvancedToolbar filterFields={filterFields}
          setIsLoading={setIsLoading}
          setQuerySearch={setQuerySearch}
          querySearch={querySearch}
        >
          <CategoriesTableToolbarActions table={table}
            fetchData={fetchData}
            setIsLoading={setIsLoading}
          />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  )
}
