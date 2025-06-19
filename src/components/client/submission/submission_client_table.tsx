
"use client"

import * as React from "react"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTableFilterField } from "@/types/ui/data-table"
import { TableInstanceProvider } from "@/components/admin/share/data-table/table-instance-provider"
import { DataTable } from "@/components/admin/share/data-table/data-table"
import { DataTableAdvancedToolbar } from "@/components/admin/share/data-table/advance/data-table-advance-toolbar"
import { getSubmissionClientColumns } from "./submission_client_table_column"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"

import { FetchClientGetApiSignalNoToken } from "@/actions/client/fetch_client_api"
import API from "@/api/api"
import { DateRangePicker } from "@/components/admin/share/data-table/advance/date-range-picker"


export function SubmissionClientTable() {



  const [isLoading, setIsLoading] = React.useState(false)
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [dataResult, setDataResult] = React.useState<SubmissionClientResponse[]>([])
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
        `/api/proxy/search?${querySearch}&api=${API.SUBMISSON.SUBMISSION_CLIENT_FILTER}`,
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



  // cái này là từng dòng dữ liệu của bảng kể cả header
  const columns = React.useMemo(() => getSubmissionClientColumns(), [])

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
  const filterFields: DataTableFilterField<SubmissionClientResponse>[] = [
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
    data: dataResult, // dữ liệu đổ vào table
    columns, // cái này là từng dòng dữ liệu của bảng kể cả header
    pageCount: totalPages, // tổng số trang
    filterFields, // bộ lọc
    defaultPerPage: 10, // tổng số phần tử trên 1 trang
    setQuerySearch: setQuerySearch,
    querySearch: querySearch,
    setIsLoading: setIsLoading
  })

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <TableInstanceProvider table={table}>

      <DateRangePicker
        setIsLoading={setIsLoading}
        setQuerySearch={setQuerySearch}
        querySearch={querySearch}
        triggerSize="sm"
        triggerClassName="ml-auto w-56 sm:w-60 mr-1"
        className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/50"
        align="end"
      />

      <DataTable
        table={table}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setQuerySearch={setQuerySearch}
        querySearch={querySearch}
      >

        <DataTableAdvancedToolbar
          filterFields={filterFields}
          setIsLoading={setIsLoading}
          setQuerySearch={setQuerySearch}
          querySearch={querySearch}
        >

        </DataTableAdvancedToolbar>

      </DataTable>


    </TableInstanceProvider>
  )
}
