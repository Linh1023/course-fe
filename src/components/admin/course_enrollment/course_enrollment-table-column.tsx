import { FetchClientPutApi } from "@/actions/client/fetch_client_api";
import API from "@/api/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { DataTableColumnHeader } from "../share/data-table/data-table-column-header";

const statusMap = {
  active: {
    variant: "secondary",
    dotColor: "bg-green-500",
    label: "Hoạt động",
  },
  inactive: {
    variant: "destructive",
    dotColor: "bg-red-300",
    label: "Ngưng hoạt động",
  },
  pending: {
    variant: "outline",
    dotColor: "bg-yellow-400",
    label: "Đang chờ duyệt",
  },
} as const;

const updateStatus = async (newStatus: "active" | "inactive", id: string) => {
  try {
    const res = await FetchClientPutApi(
      API.COURSE_ENROLLMENT.ADMIN_CHANGE_STATUS,
      { status: newStatus, courseEnrollmentId: Number(id) }
    );

    if (res.status != 200) throw new Error("Update failed");
    else {
      toast.success("Cập nhật trạng thái thành công");
    }
  } catch (err) {
    toast.error("Không thể cập nhật trạng thái");
  }
};

export function getColumns(): ColumnDef<CourseEnrollmentAdmin>[] {
  return [
    {
      accessorKey: "accountName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên học viên" />
      ),
      cell: ({ row }) => (
        <span className="max-w-[10rem] truncate font-medium">
          {row.getValue("accountName")}
        </span>
      ),
    },
    {
      accessorKey: "courseName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên khóa học" />
      ),
      cell: ({ row }) => (
        <span className="max-w-[10rem] truncate font-medium">
          {row.getValue("courseName")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        const status = row.original.status as keyof typeof statusMap;
        const statusData = statusMap[status] ?? statusMap["inactive"];

        return (
          <div className="flex items-center space-x-3">
            <Badge
              variant={statusData.variant}
              className="flex items-center gap-1 min-w-[8rem]"
            >
              <div className={`w-2 h-2 rounded-full ${statusData.dotColor}`} />
              {statusData.label}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <Ellipsis className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {row.original.status === "active" && (
              <DropdownMenuItem
                className="bg-red-100 hover:bg-red-200 text-red-800"
                onSelect={async () =>
                  await updateStatus("inactive", row.original.id)
                }
              >
                Ngưng kích hoạt
              </DropdownMenuItem>
            )}
            {row.original.status === "inactive" && (
              <DropdownMenuItem
                className="bg-green-100 hover:bg-green-200 text-green-800"
                onSelect={async () =>
                  await updateStatus("active", row.original.id)
                }
              >
                Kích hoạt
              </DropdownMenuItem>
            )}
            {row.original.status === "pending" && (
              <>
                <DropdownMenuItem
                  className="dark:bg-slate-500 dark:text-white bg-green-100 hover:bg-green-200 text-green-800"
                  onSelect={async () =>
                    await updateStatus("active", row.original.id)
                  }
                >
                  Duyệt
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="dark:bg-slate-500 dark:text-white bg-red-100 hover:bg-red-200 text-red-800 mt-1"
                  onSelect={async () =>
                    await updateStatus("inactive", row.original.id)
                  }
                >
                  Từ chối
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
