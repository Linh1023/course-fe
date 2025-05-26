import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';


const SearchHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="relative w-80">
        <Input
          type="text"
          placeholder="Tìm kiếm khóa học"
          className="pl-10"
        />
        <Search 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchHeader;