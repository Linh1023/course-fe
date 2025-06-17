import { API_HOST } from "@/utils/env";

const COURSE_ENROLLMENT_API = {
  GET_COURSE_ENROLL: `${API_HOST}/api/course-enrollment/course-enroll`,
  ADMIN_LIST_COURSE_ENROLLMENT: `${API_HOST}/api/course-enrollment/list-admin`,
  ADMIN_DELETE_COURSE_ENROLLMENT: `${API_HOST}/api/course-enrollment/change-status-admin`,
  CREATE_COURSE_ENROLLMENT: `${API_HOST}/api/course-enrollment/create`,
  OF_ACCOUNT: `${API_HOST}/api/course-enrollment/of-account`,
  REGISTER_COURSE_CLIENT: `${API_HOST}/api/course-enrollment/register-course-client`,
  CANCEL_COURSE_REGISTER: `${API_HOST}/api/course-enrollment/cancel-course-register`,
};
export default COURSE_ENROLLMENT_API;