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
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { DateRangePicker } from "../share/data-table/advance/date-range-picker"
import API from "@/api/api"
import { FetchServerGetApi } from "@/actions/server/fetch_server_api"
import { useDebounce } from "@/hooks/use-debounce"
import { FetchClientGetApiNoToken, FetchClientGetApiSignalNoToken } from "@/actions/client/fetch_client_api"


// interface Props {
//   submissionsPromise: Promise<SubmissionPageResponse>
// }

export function SubmissionTable() {



  const [isLoading, setIsLoading] = React.useState(false)
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [dataResult, setDataResult] = React.useState<SubmissionAdminResponse[]>([])
  const [totalPages, setTotalPages] = React.useState(1)
  const router = useRouter()
  const abortControllerRef = React.useRef<AbortController | null>(null); // Use ref to keep track of the controller



  const [querySearch, setQuerySearch] = React.useState(() => searchParams.toString());
  const debouncedQuery = useDebounce(querySearch, 500);

  React.useEffect(() => {
    setIsLoading(true);

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
          `/api/proxy/search?q=${debouncedQuery}&api=${API.SUBMISSON.SUBMISSION}`,
          signal
        );

        if (submissions?.status === 200) {
          setDataResult(submissions.result);
          setTotalPages(submissions.totalPages);

          // ✅ Chỉ chạy nếu không bị huỷ
          console.log("fetch >>> ", `${pathName}?${debouncedQuery}`);
          router.replace(`${pathName}?${debouncedQuery}`);
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

    fetchData();
  }, [debouncedQuery]);




  // cái này là từng dòng dữ liệu của bảng kể cả header
  const columns = React.useMemo(() => getSubmissionColumns(setIsLoading), [setIsLoading])

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
      label: "Tài khoản",
      value: "submitterUsername",
      placeholder: "Lọc tài khoản học viên...",
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
    querySearch: querySearch
  })

  const [isOpen, setIsOpen] = React.useState(false)



  return (
    <>


      <DateRangePicker
        setIsLoading={setIsLoading}
        triggerSize="sm"
        triggerClassName="ml-auto w-56 sm:w-60 mr-1"
        className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/50"
        align="end"
      />

      <TableInstanceProvider table={table}>

        <DataTable
          table={table}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          // SubmissionTableFloatingBar cái này là cái button popup lên ở phía dưới màn hình khi mình chọn 1 dòng dữ liệu để xóa
          floatingBar={<SubmissionTableFloatingBar table={table}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsLoading={setIsLoading}
          />}
        >

          <DataTableAdvancedToolbar filterFields={filterFields}
            setIsLoading={setIsLoading}
            setQuerySearch={setQuerySearch}
            querySearch={querySearch}
          >

            {/* SubmissionTableToolbarActions cái này là button nằm ở phía bên trái của filter dùng để xóa và tạo mới */}
            <SubmissionTableToolbarActions
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              table={table}
              setIsLoading={setIsLoading}
            />

          </DataTableAdvancedToolbar>

        </DataTable>


      </TableInstanceProvider>
    </>



  )
}
