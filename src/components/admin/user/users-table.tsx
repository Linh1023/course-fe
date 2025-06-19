"use client"

import * as React from "react";
import { TableInstanceProvider } from "@/components/admin/share/data-table/table-instance-provider";
import { DataTable } from "@/components/admin/share/data-table/data-table";
import { DataTableFilterField } from "@/types/ui/data-table";
import { DataTableAdvancedToolbar } from "@/components/admin/share/data-table/advance/data-table-advance-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { UsersTableFloatingBar } from "./users-table-floating-bar";
import { UsersTableToolbarActions } from "./users-table-toolbar-actions";
import { getColumns } from "./users-table-column";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { FetchClientGetApiSignalNoToken } from "@/actions/client/fetch_client_api";
import API from "@/api/api";


export function UsersTable() {

  const [isLoading, setIsLoading] = React.useState(false)
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [dataResult, setDataResult] = React.useState<User[]>([])
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
        `/api/proxy/search?${querySearch}&api=${API.ACCOUNT.ROOT}`,
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
  const columns = React.useMemo(() => getColumns(setIsLoading, fetchData), []);

  const filterFields: DataTableFilterField<User>[] = [
    {
      label: "Họ tên",
      value: "name",
      placeholder: "Lọc theo họ tên...",
    },
    {
      label: "Tài khoản",
      value: "username",
      placeholder: "Lọc theo tài khoản...",
    },
    {
      label: "Email",
      value: "email",
      placeholder: "Lọc theo email...",
    },
    {
      label: "Vai trò",
      value: "role",
      placeholder: "Lọc theo vai trò...",
      options: [
        { label: "Quản Trị Viên", value: "ADMIN" },
        { label: "Học Viên", value: "CLIENT" },
      ],
    },
    {
      label: "Trạng thái",
      value: "status",
      placeholder: "Lọc theo trạng thái...",
      options: [
        { label: "Hoạt động", value: "active" },
        { label: "Ngưng hoạt động", value: "inactive" },
      ],
    },
  ];

  const { table } = useDataTable({
    data: dataResult,
    columns,
    pageCount: totalPages,
    filterFields,
    defaultPerPage: 10,
    setQuerySearch: setQuerySearch,
    querySearch: querySearch,
    setIsLoading: setIsLoading
  });

  return (
    <TableInstanceProvider table={table}>
      <DataTable
        table={table}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setQuerySearch={setQuerySearch}
        querySearch={querySearch}

        floatingBar={<UsersTableFloatingBar
          table={table}
          setIsLoading={setIsLoading}
          fetchData={fetchData}
        />}
      >
        <DataTableAdvancedToolbar
          filterFields={filterFields}
          setIsLoading={setIsLoading}
          setQuerySearch={setQuerySearch}
          querySearch={querySearch}
        >
          <UsersTableToolbarActions table={table}
            setIsLoading={setIsLoading}
            fetchData={fetchData}
          />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  );
}