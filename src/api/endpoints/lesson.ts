import { API_HOST } from "@/utils/env";


const LESSON_API = {
  GET_COURSE_INFO: `${API_HOST}/api/lesson/course-info`,
  INTROSPECT_COURSE_ENROLLMENT : `${API_HOST}/api/lesson/introspect-course-enrollment`,
  GET_LESSON : `${API_HOST}/api/lesson/get-lesson`,
};
export default LESSON_API;