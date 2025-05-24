"use server"

import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from '@/utils/env';
import { redirect } from 'next/navigation'; // Import hàm redirect
import { FetchServerPostApiNoToken } from './fetch_server_api';
import API from '@/api/api';
import { setAccessToken, setRefreshToken } from './token_store';
// action chuyen huong de login google
export const  LoginGoogleAction = async () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI!)}` +
        `&response_type=code` +     // Yêu cầu code thay vì token
        `&scope=openid email profile` +
        `&access_type=offline` +
        `&prompt=consent`;

    redirect(googleAuthUrl);
}


export const LoginWithCode = async (authenticationRequest: AuthenticationRequest) => {

    // post login
    const res = await FetchServerPostApiNoToken(API.AUTH.AUTH_GOOGLE, authenticationRequest);
    // thanh cong
    if (res && res.status === 200) {
        const data: AuthenticationResponse = res.result
        await setAccessToken(data.accessToken)
        await setRefreshToken(data.refreshToken)
    }
    return res;
}