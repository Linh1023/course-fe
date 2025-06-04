import { API_HOST } from "@/utils/env";


const ACCOUNT_API = {
    CURRENT_ACCOUNT: `${API_HOST}/api/account/current-account`,

    ROOT: `${API_HOST}/api/account`, // Endpoint chính cho danh sách người dùng
    GET_BY_ID: (id: string) => `${API_HOST}/api/account/${id}`,
    CREATE: `${API_HOST}/api/account`,
    UPDATE: (id: string) => `${API_HOST}/api/account/${id}`,
    DELETE: (id: string) => `${API_HOST}/api/account/${id}`,
}

export default ACCOUNT_API;