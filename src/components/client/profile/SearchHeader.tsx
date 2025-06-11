"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchHeaderProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchHeader({ name, setName, setPage, setIsSearching }: SearchHeaderProps) {
  // State để lưu giá trị input trước khi debounce
  const [inputValue, setInputValue] = React.useState(name);
  
  // Ref để track việc đã khởi tạo
  const isInitializedRef = React.useRef(false);

  // Debounce giá trị input với delay 500ms
  const debouncedValue = useDebounce(inputValue, 500);

  // Sync inputValue với name prop khi component mount hoặc name thay đổi từ bên ngoài
  React.useEffect(() => {
    if (!isInitializedRef.current) {
      setInputValue(name);
      isInitializedRef.current = true;
    }
  }, [name]);

  // Cập nhật state name và reset page khi debouncedValue thay đổi
  React.useEffect(() => {
    // Chỉ update nếu đã khởi tạo và giá trị thực sự thay đổi
    if (isInitializedRef.current && debouncedValue !== name) {
      setName(debouncedValue);
      setPage(1); // Reset về trang 1 khi tìm kiếm
      setIsSearching(false); // Tắt trạng thái searching sau khi debounce xong
    }
  }, [debouncedValue, name, setName, setPage, setIsSearching]);

  // Xử lý thay đổi input
  const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Bật loading ngay lập tức khi người dùng nhập (chỉ khi có thay đổi thực sự)
    if (newValue !== name && isInitializedRef.current) {
      setIsSearching(true);
    }
  }, [name, setIsSearching]);

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