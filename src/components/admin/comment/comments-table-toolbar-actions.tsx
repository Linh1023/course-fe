// comments-table-toolbar-actions.tsx
"use client";

import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommentsTableToolbarActionsProps {
  table: Table<TypeComment>;
}

export function CommentsTableToolbarActions({
  table,
}: CommentsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        // Button to delete selected rows
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  const selectedIds = table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original.id);

                  // Call your API to delete comments
                  await fetch("/api/comments/delete", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ids: selectedIds }),
                  });

                  // Optionally, you may want to refresh the table data here
                  // e.g., call a refetch function or reload the page
                }}
              >
                Xóa
              </Button>
            </TooltipTrigger>
            <TooltipContent>Xóa các bình luận đã chọn</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
