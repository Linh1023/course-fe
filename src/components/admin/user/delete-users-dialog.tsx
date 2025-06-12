"use client"

import * as React from "react"
import { type Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "lucide-react"
import { LoaderIcon } from "@/components/share/loading-icon"
import API from "@/api/api"
import { FetchServerDeleteApi } from "@/actions/server/fetch_server_api"
import { toast } from "sonner"

interface DeleteUsersDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  users: Row<User>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
  setIsLoading: (v: boolean) => void
}

export function DeleteUsersDialog({
  users,
  showTrigger = true,
  onSuccess,
  setIsLoading,
  ...props
}: DeleteUsersDialogProps) {
  const [isDeletePending, setIsDeletePending] = React.useState(false);

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={isDeletePending}>
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({users.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có muốn xóa?</DialogTitle>
          <DialogDescription>
            <>
              Hành động này sẽ không được hoàn tác. Điều này sẽ xóa{" "}
              <span className="font-medium">{users.length}</span> người dùng của bạn.
            </>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeletePending}>Hủy</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={async () => {
              setIsDeletePending(true);
              try {
                await Promise.all(
                  users.map((user) =>
                    FetchServerDeleteApi(API.ACCOUNT.DELETE(user.id), "/admin/user")
                  )
                );
                props.onOpenChange?.(false);
                setIsLoading(true);
                onSuccess?.();
              } catch (error) {
                console.error("Delete users error:", error);
                toast.error("Xóa người dùng thất bại, vui lòng thử lại!");
              } finally {
                setIsDeletePending(false);
              }
            }}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <LoaderIcon
                className="mr-1.5 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}