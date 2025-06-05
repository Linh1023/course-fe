"use server"
import { NextResponse } from 'next/server'
import API from "@/api/api"
import { FetchServerPostApiNoToken } from "./fetch_server_api"
import { getToken } from "./token_store"

export const introspectAccessTokenInMiddleware = async (req: AccessTokenRequest) => {

    const res = await FetchServerPostApiNoToken
        (API.AUTH.INTROSPECT_ACCESS_TOKEN, req)
    if (res && res.status == 200) {
        return res.result
    }
    return null
}




export const refreshTokenInMiddleware = async (req: RefreshTokenRequest): Promise<AuthResult> => {

    // xin cap lai accesstoken tu refreshToken
    const res = await FetchServerPostApiNoToken(API.AUTH.REFRESH_TOKEN, req)
    // nhan duoc access token moi
    if (res && res.status == 200) {
        const data: AuthenticationResponse = res.result

        const response = NextResponse.next();
        response.cookies.set('access_token', data.accessToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: 60 * 30,
        });

        return {
            isAuthentication: true,
            role: data.role,
            response: response
        }

    }
    //    refresh token khong hop le
    else {

        return {
            isAuthentication: false,
            role: "guest",
            response: null
        }
    }
}


interface AuthResult {
    isAuthentication: boolean;
    role: string;
    response: NextResponse | null;
}


export const authentication = async (): Promise<AuthResult> => {

    const refreshToken = await getToken("refresh_token");
    const accessToken = await getToken("access_token");

    const accessTokenRequest: AccessTokenRequest = {
        accessToken: accessToken
    }

    const refreshTokenRequest: RefreshTokenRequest = {
        refreshToken: refreshToken
    }

    // neu khong co access token va refresh token
    if (accessToken === undefined && refreshToken === undefined) {

        return {
            isAuthentication: false,
            role: "guest",
            response: null
        };
    }

    // neu access token khong co va co refreshToken 
    if (accessToken === undefined) {
        // xin cap lai access token
        return refreshTokenInMiddleware(refreshTokenRequest)
    }
    // truong hop co access token
    else if (accessToken != undefined) {
        // kiem tra accessToken co hop le khong
        const data: AuthenticationResponse | null = await introspectAccessTokenInMiddleware(accessTokenRequest)
        // accessToken khong hop le thi xin cap lai refresh token
        if (data === null) {
            // neu khong co refreshToken

            if (refreshToken === undefined) {
                return {
                    isAuthentication: false,
                    role: "guest",
                    response: null
                };
            }
            // neu co refreshToken xin cap lai access token
            else {
                return refreshTokenInMiddleware(refreshTokenRequest)
            }
        }
        // accessToken hop le 
        else {

            return {
                isAuthentication: true,
                role: data.role,
                 response: null
            };
        }

    }


    return {
        isAuthentication: false,
        role: "guest",
        response: null
    };
}