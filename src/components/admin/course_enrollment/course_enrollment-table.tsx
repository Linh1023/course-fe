"use client";

import { FetchClientGetApiSignalNoToken } from "@/actions/client/fetch_client_api";
import API from "@/api/api";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableFilterField } from "@/types/ui/data-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar";
import { DataTable } from "../share/data-table/data-table";
import { TableInstanceProvider } from "../share/data-table/table-instance-provider";
import { getColumns } from "./course_enrollment-table-column";
import { CESTableFloatingBar } from "./course_enrollment-table-floating-bar";
import { CESTableToolbarActions } from "./course_enrollment-table-toolbar-actions";

// CourseEnrollmentAdmin

export function CourseEnrollmentTable() {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [dataResult, setDataResult] = React.useState<CourseEnrollmentAdmin[]>(
    []
  );
  const [totalPages, setTotalPages] = React.useState(1);
  const router = useRouter();
  const abortControllerRef = React.useRef<AbortController | null>(null); // Use ref to keep track of the controller

  const [querySearch, setQuerySearch] = React.useState(() =>
    searchParams.toString()
  );

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
        `/api/proxy/search?${querySearch}&api=${API.COURSE_ENROLLMENT.ADMIN_LIST_COURSE_ENROLLMENT}`,
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
      if (err.name === "AbortError") {
        // Yêu cầu bị huỷ, không làm gì cả
        return;
      } else {
        console.error("Lỗi khi fetch:", err);
      }
    } finally {
      // ✅ Luôn setIsLoading(false) nếu không bị huỷ
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

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
  const filterFields: DataTableFilterField<CourseEnrollmentAdmin>[] = [
    {
      label: "Tên học viên",
      value: "accountName",
      placeholder: "Lọc tên danh mục...",
    },
    {
      label: "Tên khóa học",
      value: "courseName",
      placeholder: "Lọc theo mô tả danh mục...",
    },
    {
      label: "Trạng thái",
      value: "status",
      placeholder: "Lọc theo trạng thái...",
      options: [
        { label: "Hoạt động", value: "active" },
        { label: "Đang chờ", value: "pending" },
        { label: "Không hoạt động", value: "inactive" },
      ],
    },
  ];

  // TODO: Replace with actual data fetching logic
  const { table } = useDataTable({
    data: dataResult,
    columns,
    pageCount: totalPages,
    // optional props
    filterFields,
    defaultPerPage: 10,
    setQuerySearch: setQuerySearch,
    querySearch: querySearch,
    setIsLoading: setIsLoading,
  });

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setQuerySearch={setQuerySearch}
        querySearch={querySearch}
        floatingBar={
          <CESTableFloatingBar
            table={table}
            setIsLoading={setIsLoading}
            fetchData={fetchData}
          />
        }
      >
        <DataTableAdvancedToolbar
          filterFields={filterFields}
          setIsLoading={setIsLoading}
          setQuerySearch={setQuerySearch}
          querySearch={querySearch}
        >
          <CESTableToolbarActions
            table
            
            ={table}
            setIsLoading={setIsLoading}
            fetchData={fetchData}
          />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  );
}
