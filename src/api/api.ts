import ACCOUNT_API from "./endpoints/account";
import AUTH_API from "./endpoints/auth";
import CATEGORY_API from "./endpoints/category";
import COMMENT_API from "./endpoints/comment";
import COURSE_API from "./endpoints/course";
import COURSE_ENROLLMENT_API from "./endpoints/course_enrollment";
import LESSON_API from "./endpoints/lesson";
import LESSON_PROGRESS_API from "./endpoints/lesson_progress";
import PROFILE_API from "./endpoints/profile";
import REFRESH_TOKEN_API from "./endpoints/refresh_token";
import SUBMISSION_API from "./endpoints/submission";

const API = {
  AUTH: AUTH_API,
  REFRESH_TOKEN: REFRESH_TOKEN_API, 
  ACCOUNT:ACCOUNT_API,
  CATEGORY:CATEGORY_API,
  COMMENT:COMMENT_API,
  COURSE_ENROLLMENT:COURSE_ENROLLMENT_API,
  COURSE:COURSE_API,
  LESSON_PROGRESS:LESSON_PROGRESS_API,
  LESSON:LESSON_API,
  PROFILE:PROFILE_API,
  SUBMISSON:SUBMISSION_API,
};

export default API;