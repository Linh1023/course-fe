"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; // Giả định bạn có hook useDebounce

interface SearchHeaderProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchHeader({ name, setName, setPage }: SearchHeaderProps) {
  // State để lưu giá trị input trước khi debounce
  const [inputValue, setInputValue] = React.useState(name);

  // Debounce giá trị input với delay 500ms
  const debouncedValue = useDebounce(inputValue, 500);

  // Cập nhật state name và reset page khi debouncedValue thay đổi
  React.useEffect(() => {
    if (debouncedValue !== name) {
      setName(debouncedValue);
      setPage(1); // Reset về trang 1 khi tìm kiếm
    }
  }, [debouncedValue, name, setName, setPage]);

  // Xử lý thay đổi input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-80">
        <Input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          className="pl-10"
          value={inputValue}
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