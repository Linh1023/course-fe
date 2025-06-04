'use server';
import { cookies } from 'next/headers';

// set refresh token vao cookies httponly
export async function setRefreshToken(refreshToken: string) {
  const maxAge = 60 * 60 * 24 * 32; // 32 ngày

  const cookieStore = cookies();

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    // secure: true,
    path: '/',
    maxAge,
  });
}

// Xoa refresh token khoi cookies
export async function removeToken(nameToken: string) {
  const cookieStore = cookies();

  cookieStore.delete(nameToken);
}

// set access token vao cookes 
export async function setAccessToken(accessToken: string) {
  const maxAge = 60 * 30; // 30 phút

  const cookieStore = cookies();

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    // secure: true,
    path: '/',
    maxAge,
  });
}


// lay access token hoac refresh token
export async function getToken(nameToken:string){
  const cookieStore = cookies();
  return cookieStore.get(nameToken)?.value;
}


