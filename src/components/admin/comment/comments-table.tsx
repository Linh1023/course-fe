"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTableFilterField } from "@/types/ui/data-table";
import { use, useMemo } from "react";
import { DataTableAdvancedToolbar } from "../share/data-table/advance/data-table-advance-toolbar";
import { DataTable } from "../share/data-table/data-table";
import { TableInstanceProvider } from "../share/data-table/table-instance-provider";
import { getCommentColumns } from "./comments-table-column";
import { CommentsTableFloatingBar } from "./comments-table-floating-bar";
import { CommentsTableToolbarActions } from "./comments-table-toolbar-actions";

interface CommentsTableProps {
  commentPromise: Promise<CommentAdminResponse>;
}

export function CommentsTable({ commentPromise }: CommentsTableProps) {
  // Use React's experimental 'use' to resolve the promise (React 18+)
  const { result, totalPages } = use(commentPromise);

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo(() => getCommentColumns(), []);


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
    data: result,
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
        floatingBar={<CommentsTableFloatingBar table={table} />}
      >
        <DataTableAdvancedToolbar filterFields={filterFields}>
          <CommentsTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </TableInstanceProvider>
  );
}
