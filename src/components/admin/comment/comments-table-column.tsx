// comments-table-toolbar-actions.tsx
"use client";

import { FetchClientPutApi } from "@/actions/client/fetch_client_api";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { DataTableColumnHeader } from "../share/data-table/data-table-column-header";
import { DeleteCommentsDialog } from "./delete-comments-dialog";
import { set } from "zod";

export function getCommentColumns(): ColumnDef<CommentAdmin>[] {
  return [
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
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "lessonName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên bài học" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {row.getValue("lessonName")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "authorName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên người dùng" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("authorName")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "content",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nội dung" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("content")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showDeleteCommentDialog, setShowDeleteCommentDialog] =
          useState(false);
        // const fetchDeleteComment = async (commentId: string) => {
        //   const request: CommentStatusRequest = {
        //     commentId: commentId,
        //     status: "inactive",
        //   };
        //   const res = await FetchClientPutApi(
        //     API.COMMENT.ADMIN_DELETE_COMMENT,
        //     request
        //   );
        // };

        return (
          <>
            <DeleteCommentsDialog
              open={showDeleteCommentDialog}
              onOpenChange={setShowDeleteCommentDialog}
              comments={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <Ellipsis className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <Link
                    href={`/lesson/${row.original.lessonId}?comment=${row.original.id}`}
                  >
                    Xem chi tiết
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                onSelect={() => {
                    setTimeout(() => {
                      setShowDeleteCommentDialog(true)
                    }, 0)
                  }}>
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
