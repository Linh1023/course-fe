import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchHeaderProps {
  coursesCount: number;
}

const SearchHeader = ({ coursesCount }: SearchHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Courses <span className="text-gray-500">({coursesCount})</span>
      </h1>
      <div className="relative w-80">
        <Input
          type="text"
          placeholder="Search User"
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