'use server';
import { cookies } from 'next/headers';

export async function setRefreshToken(refreshToken: string) {
  const maxAge = 60 * 60 * 24 * 32; // 32 ngày

  const cookieStore = cookies();

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    path: '/',
    maxAge,
  });
}


export async function removeRefreshToken() {
  const cookieStore = cookies();

  cookieStore.delete('refresh_token');
}


export async function setAccessToken(accessToken: string) {
  const maxAge = 60 * 30; // 30 phút

  const cookieStore = cookies();

  cookieStore.set('access_token', accessToken, {
    httpOnly: false,
    path: '/',
    maxAge,
  });
}

export async function getToken(nameToken:string){
  const cookieStore = cookies();
  return cookieStore.get(nameToken)?.value;
}


