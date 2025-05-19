import { API_HOST } from "@/utils/env";


const AUTH_API = {
  AUTH_GOOGLE: `${API_HOST}/api/auth/google`,
  REFRESH_TOKEN : `${API_HOST}/api/auth/refresh-token`,
  HELLO_TEST : `${API_HOST}/api/auth/hello`
};

export default AUTH_API;