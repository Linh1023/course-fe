import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { CommentsTable } from "@/components/admin/comment/comments-table";
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton";
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

export interface CommentPageProps {
  searchParams: ReadonlyURLSearchParams;
}

const CommentPage = async ({ searchParams }: CommentPageProps) => {
  const query = new URLSearchParams(searchParams).toString();
  const commentPromise = FetchServerGetApi(
    API.COMMENT.ADMIN_LIST_COMMENT + `?${query}`,
    "/admin/comment"
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[100px] flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Quản Lý Bình Luận</h1>
      </div>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={6}
            cellWidths={["5rem", "40rem", "12rem", "5rem", "5rem", "5rem"]}
            shrinkZero
          />
        }
      >
        {/* Khoang tg */}
        {/* <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60 mr-1"
          className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/50"
          align="end"
        /> */}
        <CommentsTable commentPromise={commentPromise} />
      </React.Suspense>
    </div>
  );
};

export default CommentPage;
