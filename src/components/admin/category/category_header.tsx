"use client"

import { Button } from "@/components/ui/button"
import { ResponsiveDialog } from "@/components/admin/share/responsive_dialog"
import { useState } from "react"
import { CategoryForm } from "./category_form"
import { Plus } from "lucide-react";

const CategoryHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = (data: any) => {
    setIsOpen(false);
  }
    return (
      <div className="h-[100px] flex items-center justify-between gap-2">
          <h1 className="text-xl font-semibold">Quản Lý Danh Mục</h1>
          <Button className="bg-[#fe4444] hover:bg-[#ef4444]" onClick={() => setIsOpen(!isOpen)}>
            <Plus className="h-4 w-4" />
            Thêm danh mục
            </Button>
          <ResponsiveDialog  isOpen={isOpen} setIsOpen={setIsOpen} title={"Thêm danh mục"} >
            <CategoryForm onSubmit={handleSubmit} setIsOpen={setIsOpen} />
          </ResponsiveDialog>
      </div>
    )
}
export default CategoryHeader