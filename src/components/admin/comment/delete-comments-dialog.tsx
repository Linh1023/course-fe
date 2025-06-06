"use client";

import { type Row } from "@tanstack/react-table";
import * as React from "react";
// import { toast } from "sonner"

import { FetchServerPutApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { LoaderIcon } from "@/components/share/loading-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";

interface DeleteCommentsDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  comments: Row<CommentAdmin>["original"][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function DeleteCommentsDialog({
  comments,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteCommentsDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Xóa ({comments.length}) bình luận
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có muốn xóa?</DialogTitle>
          <DialogDescription>
            <>
              Hành động này sẽ không được hoàn tác. Điều này sẽ xóa{" "}
              <span className="font-medium">{comments.length}</span> bình luận
              của bạn.
            </>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={() => {
              startDeleteTransition(async () => {
                await Promise.all(
                  comments.map((comment) =>
                    FetchServerPutApi(
                      `${API.COMMENT.ADMIN_DELETE_COMMENT}`,
                      {
                        commentId: comment.id, // "1,2,3"
                        status: "inactive",
                      },
                      "/admin/comment"
                    )
                  )
                );

                props.onOpenChange?.(false);
                onSuccess?.();
              });
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
  );
}
