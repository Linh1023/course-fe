"use server"

import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from '@/utils/env';
import { redirect } from 'next/navigation'; // Import hàm redirect
export const  LoginAction = async () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI!)}` +
        `&response_type=code` +     // Yêu cầu code thay vì token
        `&scope=openid email profile` +
        `&access_type=offline` +
        `&prompt=consent`;

    redirect(googleAuthUrl);
}