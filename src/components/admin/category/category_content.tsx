"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type Category = {
  name: string;
  detail?: string;
};

export function CategoryContent() {
  const [categories, setCategories] = useState<Category[]>([
    { name: "Lớp 12", detail: "hihihihi" },
    { name: "Lớp 11", detail: "Mô tả khác" },
  ]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(categories.length).fill(false));

  const toggleAll = (checked: boolean) => {
    setCheckedItems(Array(categories.length).fill(checked));
  };

  const toggleItem = (index: number, checked: boolean) => {
    setCheckedItems((prev) => {
      const newChecked = [...prev];
      newChecked[index] = checked;
      return newChecked;
    });
  };

  const allChecked = checkedItems.every(Boolean);
  const someChecked = checkedItems.some(Boolean);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button className="bg-[#fe4444] hover:bg-[#ef4444]">
          Xóa tất cả mục đã chọn
        </Button>
        <div className="flex items-center gap-2"> 
         <Input placeholder="Nhập tên danh mục"/> 
         <Button className="bg-[#fe4444] hover:bg-[#ef4444]">Tìm</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={allChecked}
                onCheckedChange={(val) => toggleAll(Boolean(val))}
              />
            </TableHead>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((e, i) => (
            <TableRow key={i}>
              <TableCell>
                <Checkbox
                  checked={checkedItems[i]}
                  onCheckedChange={(val) => toggleItem(i, Boolean(val))}
                />
              </TableCell>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.detail}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" /> Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 className="h-4 w-4 mr-2 text-red-500" /> Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        
    </div>
  );
}
