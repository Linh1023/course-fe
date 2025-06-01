import { API_HOST } from "@/utils/env";


const PROFILE_API = {
    CURRENT_PROFILE : `${API_HOST}/api/profile/current-profile`,
    CHANGE_PROFILE : `${API_HOST}/api/profile/change-profile`,
};
export default PROFILE_API;