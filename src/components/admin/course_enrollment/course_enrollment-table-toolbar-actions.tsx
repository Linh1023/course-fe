"use client";

import { type Table } from "@tanstack/react-table";

// import { DeleteCESDialog } from "./delete-ces-dialog"
// import { CreateCEDialog } from "./create-ce-dialog"
import { useState, useTransition } from "react";
import { CreateCourseEnrollmentDialog } from "./create-course_enrollment-dialog";

interface CESTableToolbarActionsProps {
  table: Table<CourseEnrollmentAdmin>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}

export function CESTableToolbarActions({
  table,
  setIsLoading,
  fetchData,
}: CESTableToolbarActionsProps) {
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [showCreateCourseEnrollmentSheet, setShowCreateCourseEnrollmentSheet] =
    useState(false);
  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteCESDialog
          ces={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            toast.success(
              `Đã xóa ${table.getFilteredSelectedRowModel().rows.length} danh mục thành công!`
            )
            table.toggleAllRowsSelected(false)
          }
          }
        />
      ) : null} */}
      <CreateCourseEnrollmentDialog
        setIsLoading={setIsLoading}
        fetchData={fetchData}
      />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
