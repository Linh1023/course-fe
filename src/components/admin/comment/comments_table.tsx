"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTableFilterField } from "@/types/ui/data-table";
import React, { use, useMemo } from "react";
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar";
import { DataTable } from "../share/data-table/data-table";
import { TableInstanceProvider } from "../share/data-table/table-instance-provider";
import { getCommentColumns } from "./comments_table_column";
import { CommentsTableFloatingBar } from "./comments_table_floating_bar";
import { CommentsTableToolbarActions } from "./comments_table_toolbar_actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { FetchClientGetApiSignalNoToken } from "@/actions/client/fetch_client_api";
import API from "@/api/api";



export function CommentsTable() {
  // Use React's experimental 'use' to resolve the promise (React 18+)



  const [isLoading, setIsLoading] = React.useState(false)
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [dataResult, setDataResult] = React.useState<CommentAdmin[]>([])
  const [totalPages, setTotalPages] = React.useState(1)
  const router = useRouter()
  const abortControllerRef = React.useRef<AbortController | null>(null); // Use ref to keep track of the controller



  const [querySearch, setQuerySearch] = React.useState(() => searchParams.toString());
  const debouncedQuery = useDebounce(querySearch, 500);

  React.useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, [debouncedQuery]);


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
        `/api/proxy/search?${debouncedQuery}&api=${API.COMMENT.ADMIN_LIST_COMMENT}`,
        signal
      );


      if (submissions?.status === 200) {
        setDataResult(submissions.result);
        setTotalPages(submissions.totalPages);

        //  Chỉ chạy nếu không bị huỷ
        console.log("fetch >>> ", `${pathName}?${debouncedQuery}`);
        router.replace(`${pathName}?${debouncedQuery}`, {
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
  const columns = useMemo(() => getCommentColumns(setIsLoading, fetchData), [setIsLoading, fetchData]);


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
  const filterFields: DataTableFilterField<CommentAdmin>[] = [
    {
      value: "authorName",
      label: "Người dùng",
      placeholder: "Tìm kiếm người dùng",
    },
    {
      value: "content",
      label: "Nội dung",
      placeholder: "Tìm kiếm nội dung bình luận",
    },
    {
      value: "lessonName",
      label: "Tên bài học",
      placeholder: "Tìm kiếm tên bài học",
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
 
  });

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setQuerySearch={setQuerySearch}
        querySearch={querySearch}
        floatingBar={<CommentsTableFloatingBar table={table}
          setIsLoading={setIsLoading}
          fetchData={fetchData}

        />}
      >
        <DataTableAdvancedToolbar filterFields={filterFields}
          setIsLoading={setIsLoading}
          setQuerySearch={setQuerySearch}
          querySearch={querySearch}
        >
          <CommentsTableToolbarActions table={table}
            setIsLoading={setIsLoading}
            fetchData={fetchData}
          />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  );
}
