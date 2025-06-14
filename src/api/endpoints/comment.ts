import { API_HOST } from "@/utils/env";


const COMMENT_API = {
    ADMIN_LIST_COMMENT: `${API_HOST}/api/comment/list-admin`,
    ADMIN_DELETE_COMMENT: `${API_HOST}/api/comment/change-status-admin`,
    COMMENT: `${API_HOST}/api/comment`,
    COMMENT_LESSON: `${API_HOST}/api/comment/lesson`,
    PUBLIC_COMMENT_COURSE: `${API_HOST}/api/comment/course`,
    PUBLIC_COMMENT_COURSE_REPLY: `${API_HOST}/api/comment/course/reply`,
    COMMENT_LESSON_REPLY: `${API_HOST}/api/comment/lesson/reply`,

};
export default COMMENT_API;