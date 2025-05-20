import { API_HOST } from "@/utils/env";


const AUTH_API = {
  AUTH_GOOGLE: `${API_HOST}/api/auth/google`,
  REFRESH_TOKEN : `${API_HOST}/api/auth/refresh`,
  INTROSPECT_REFRESH_TOKEN : `${API_HOST}/api/auth/introspect-refresh-token`,
  INTROSPECT_ACCESS_TOKEN : `${API_HOST}/api/auth/introspect-access-token`,
  HELLO_TEST : `${API_HOST}/api/auth/hello`
};

export default AUTH_API;