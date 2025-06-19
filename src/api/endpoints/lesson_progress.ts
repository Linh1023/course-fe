import { API_HOST } from "@/utils/env";


const LESSON_PROGRESS_API = {
    VIEWED_LESSON_PROGRESS : `${API_HOST}/api/lesson-progress/viewed`,
    LAST_VIEWED_LESSON : `${API_HOST}/api/lesson-progress/lastView`,
};
export default LESSON_PROGRESS_API;