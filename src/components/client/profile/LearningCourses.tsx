import SearchHeader from "./SearchHeader";
import CourseGrid from "./CourseGrid";
import PaginationCourse from "./PaginationCourse";

interface Course {
  id: string;
  title: string;
  image: string;
  instructor: string;
  ratings: number;
}
// Mock courses data
const mockCourses: CourseCardResponse[] = [
    {
        name: "Đã học 3",
        price: 100000,
        id: "11",
        imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
     {
        name: "Đã học 3",
        price: 100000,
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
     {
        name: "Đã học 3",
        price: 100000,
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
     {
        name: "Đã học 3",
        price: 100000,
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
   
   
];

const LearningCourses = () => {


  return (
    <div className="grid gap-4">
        <SearchHeader />
     <CourseGrid courses={mockCourses} />
     <PaginationCourse/>
    </div>
  );
};

export default LearningCourses;
