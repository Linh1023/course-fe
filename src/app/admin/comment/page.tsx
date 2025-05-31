import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { CommentsTable } from "@/components/admin/comment/comments-table";
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton";
import { Suspense } from "react";

const CommentPage = async () => {
  const commentPromise = await FetchServerGetApi(
    API.COMMENT.ADMIN_LIST_COMMENT
  );
  return (
    <div className="flex flex-col gap-4">
      <div className=" flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Quản Lý Bình Luận</h1>
      </div>
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={6}
            cellWidths={["5rem", "40rem", "12rem", "5rem","5rem","5rem"]}
            shrinkZero
          />
        }
      >
        <CommentsTable  commentPromise={commentPromise} />
      </Suspense>
    </div>
  );
};

export default CommentPage;
