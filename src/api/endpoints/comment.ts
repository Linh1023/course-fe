import { API_HOST } from "@/utils/env";


const COMMENT_API = {
    ADMIN_LIST_COMMENT: `${API_HOST}/api/comment/list-admin`,
    ADMIN_DELETE_COMMENT: `${API_HOST}/api/comment/change-status-admin`,
    COMMENT: `${API_HOST}/api/comment`,
    PUBLIC_LESSON_COMMENT: `${API_HOST}/api/comment/lesson`,
    PUBLIC_COURSE_COMMENT: `${API_HOST}/api/comment/course`,
    PUBLIC_COMMENT_REPLY: `${API_HOST}/api/comment/reply`,

};
export default COMMENT_API;