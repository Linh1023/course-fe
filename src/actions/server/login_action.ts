'use server'
import API from "@/api/api";
import { FetchServerPostApiNoToken } from "./fetch_server_api";
import { setAccessToken, setRefreshToken } from "./token_store";

export const LoginServerAction = async (loginRequest: LoginRequest) => {

    // post login
    const res = await FetchServerPostApiNoToken(API.AUTH.LOGIN, loginRequest);
    // thanh cong
    if (res && res.status === 200) {
        const data: AuthenticationResponse = res.result
        await setAccessToken(data.accessToken)
        await setRefreshToken(data.refreshToken)
    }
    return res;
}