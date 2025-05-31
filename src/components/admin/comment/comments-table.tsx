"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTableFilterField } from "@/types/ui/data-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../share/data-table/data-table";
import { TableInstanceProvider } from "../share/data-table/table-instance-provider";
import { getColumns } from "./comments-table-column";
import { CommentsTableToolbarActions } from "./comments-table-toolbar-actions";

async function fetchComments(
  params: URLSearchParams
): Promise<CommentResponse> {
  const query = new URLSearchParams(params);

  // Chuyển đổi tham số bộ lọc
  const processFilter = (urlParam: string, apiParam: string) => {
    if (query.has(urlParam)) {
      const value = query.get(urlParam)!;
      if (value) {
        query.set(apiParam, value.replace(".", ","));
      }
      query.delete(urlParam);
    }
  };

  processFilter("authorName", "keywordAuthorName");
  processFilter("content", "keywordContent");
  processFilter("lessonName", "keywordLessonName");

  // Xử lý phân trang
  if (query.has("page")) {
    const page = Number(query.get("page"));
    if (!isNaN(page) && page > 0) {
      query.set("pageIndex", String(page - 1)); // Chuyển page=1 thành pageIndex=0
    } else {
      console.warn(`Invalid page value: ${query.get("page")}, using default`);
      query.set("pageIndex", "0");
    }
    query.delete("page");
  } else {
    query.set("pageIndex", "0");
  }

  // Đặt pageSize
  if (!query.has("pageSize")) {
    query.set("pageSize", "10");
  }
  if (query.has("perPage")) {
    const perPage = Number(query.get("perPage"));
    query.set("pageSize", String(perPage));
  }

  // Xử lý sort và order
  if (query.has("sort")) {
    const sortValue = query.get("sort");
    if (sortValue && sortValue.includes(".")) {
      const [field, order] = sortValue.split(".");
      if (field && order && ["asc", "desc"].includes(order.toLowerCase())) {
        // Ánh xạ authorName thành accountProfileName
        query.set("sort", field);
        query.set("order", order.toLowerCase());
      } else {
        console.warn(`Invalid sort value: ${sortValue}, using default`);
        query.set("sort", "createdAt");
        query.set("order", "desc");
      }
    } else {
      console.warn(
        `Invalid or missing sort format: ${sortValue}, using default`
      );
      query.set("sort", "createdAt");
      query.set("order", "desc");
    }
  } else {
    query.set("sort", "createdAt");
    query.set("order", "desc");
  }


  const response = await FetchClientGetApi(
    `${API.COMMENT.ADMIN_LIST_COMMENT}?${query.toString()}`
    
  );
  console.log(`${query.toString()}`);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch comments: ${response.statusText}`);
  }
  return response;
}

import { FetchClientGetApi } from "@/actions/client/fetch_client_api";
import API from "@/api/api";
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar";

interface commentPromise {
  commentPromise: CommentResponse;
}

export function CommentsTable(props: commentPromise) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<CommentResponse>({
    result: [],
    totalPages: 1,
    totalItems: 10,
    currentPage: 1,
  });

  useEffect(() => {
    // skip fetching if searchParams is empty
    if (!searchParams || searchParams.size > 0) {
      setIsLoading(true);
      fetchComments(searchParams)
        .then((res) => setData(res))
        .catch((error) => console.error("Error fetching comments:", error));
    }
    setIsLoading(false);
  }, [searchParams]);

  const columns = useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<TypeComment>[] = [
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

  const { table } = useDataTable({
    data: data.result,
    columns: columns,
    pageCount: data.totalPages,
    filterFields,
    defaultPerPage: 10,
  });

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <TableInstanceProvider table={table}>
          <DataTable table={table}>
            <DataTableAdvancedToolbar filterFields={filterFields}>
              <CommentsTableToolbarActions table={table} />
            </DataTableAdvancedToolbar>
          </DataTable>
        </TableInstanceProvider>
      )}
    </>
  );
}
