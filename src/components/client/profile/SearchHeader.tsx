"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchHeader({ name, setName, setPage }: SearchHeaderProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setPage(1); // Reset về trang 1 khi tìm kiếm
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-80">
        <Input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          className="pl-10"
          value={name}
          onChange={handleSearch}
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}