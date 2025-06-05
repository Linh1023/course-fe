"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
// import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../share/data-table/data-table-column-header";
// import { UpdateCESheet } from "./update-ce-sheet"
// import { DeleteCESDialog } from "./delete-ces-dialog"
import { Ellipsis } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function getColumns(): ColumnDef<CourseEnrollment>[] {
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
      accessorKey: "accountName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên người dùng" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[10rem] truncate font-medium">
              {row.getValue("accountName")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "courseName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên khóa học" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("courseName")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "enrolledAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày đăng ký" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("enrolledAt")}
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Trạng thái" />
    //   ),
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[10rem] truncate font-medium">
    //           <Badge
    //             variant={
    //               row.getValue("status") === "active"
    //                 ? "secondary"
    //                 : "destructive"
    //             }
    //           >
    //             {row.getValue("status") === "active"
    //               ? "Hoạt động"
    //               : "Ngưng hoạt động"}
    //           </Badge>
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();
        const [showUpdateCESheet, setShowUpdateCESheet] = React.useState(false);
        const [showDeleteCEDialog, setShowDeleteCEDialog] =
          React.useState(false);

        return (
          <>
            {/* <UpdateCESheet
              open={showUpdateCESheet}
              onOpenChange={setShowUpdateCESheet}
              ce={row.original}
            /> */}
            {/* <DeleteCESDialog
              open={showDeleteCEDialog}
              onOpenChange={setShowDeleteCEDialog}
              ces={[row.original]}
              showTrigger={false}
              onSuccess={() => {
                toast.success(
                  `Đã xóa tài khoản "${row.original.accountName} đăng ký khóa học ${row.original.courseName} thành công!`
                )
                row.toggleSelected(false)
              }}
            /> */}
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
              <DropdownMenuContent
                align="end"
                className="w-40 overflow-visible dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40"
              >
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowUpdateCESheet(true);
                    }, 0);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowDeleteCEDialog(true);
                    }, 0);
                  }}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
