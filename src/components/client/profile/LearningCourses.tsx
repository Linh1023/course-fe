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
const mockCourses: Course[] = [
    {
        id: "1",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "2",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "3",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "4",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "5",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "6",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    }
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
