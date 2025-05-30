import { API_HOST } from "@/utils/env";


const ACCOUNT_API = {
    CURRENT_ACCOUNT: `${API_HOST}/api/account/current-account`,
    // Quản lý người dùng
    ROOT: `${API_HOST}/api/users`, // Endpoint chính cho danh sách người dùng
    GET_BY_ID: (id: string) => `${API_HOST}/api/users/${id}`, // Lấy thông tin người dùng theo ID
    CREATE: `${API_HOST}/api/users`, // Tạo người dùng mới
    UPDATE: (id: string) => `${API_HOST}/api/users/${id}`, // Cập nhật người dùng
    DELETE: (id: string) => `${API_HOST}/api/users/${id}`, // Xóa người dùng
};

export default ACCOUNT_API;