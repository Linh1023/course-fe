"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data_table_column_header";
import { CommentResponse } from "@/types/response/comment_response";

function formatStatus(status: string) {
  switch (status) {
    case "pending":
      return "Đang chờ";
    case "processing":
      return "Đang xử lý";
    case "success":
      return "Thành công";
    case "failed":
      return "Thất bại";
    default:
      return status;
  }
}
export const columns: ColumnDef<CommentResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    meta: {
      title: "Chọn",
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã Comment" />
    ),
    meta: { title: "Mã Comment" },
  },
  {
    accessorKey: "lessonName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên bài học" />
    ),
    meta: { title: "Tên bài học" },
  },
  {
    accessorKey: "accountName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên tài khoản" />
    ),
    meta: { title: "Tên tài khoản" },
  },
  {
    accessorKey: "content",
    header: "Nội dung",
    meta: { title: "Nội dung" },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    meta: { title: "Ngày tạo" },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ getValue }) => formatStatus(getValue() as string),
    meta: { title: "Trạng thái" },
  },
  {
    id: "actions",
    meta: { title: "Hành động" },
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem>Duyệt</DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Chi tiết bình luận</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteComment()}>
              Xóa bình luận
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
];
const handleDeleteComment = () => {
  // Xử lý xóa bình luận tại đây
  console.log("Xóa bình luận");
  // Gọi API để xóa bình luận
  // Ví dụ: await deleteCommentAPI(commentId);
};
