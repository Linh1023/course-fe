import PaginationCourse from "./PaginationCourse";
import CourseGrid from "./CourseGrid";
import SearchHeader from "./SearchHeader";

interface Course {
  id: string;
  title: string;
  image: string;
  instructor: string;
  ratings: number;
}
// Mock courses data
const mockCourses: Course[] = [
    {
        id: "1",
        title: "Đã học 1",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "2",
        title: "Đã học 2",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "3",
        title: "Đã học 3",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "4",
        title: "Đã học 4",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "5",
        title: "Đã học 5",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "6",
        title: "Đã học 6",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    }
];

const LearnedCourses = () => {


  return (
    <div className="grid gap-4">
        <SearchHeader />
     <CourseGrid courses={mockCourses} />
    <PaginationCourse />
    </div>
  );
};

export default LearnedCourses;
