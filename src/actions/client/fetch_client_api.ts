"use client"
import API from "@/api/api";
import cookie from "js-cookie";
import { getToken, setAccessToken } from "../server/token_store";

import { refreshToken } from "../server/fetch_server_api";




// Ham fetch get api khi can access token tu dong
export const FetchClientGetApi = async (api: string) => {
    try {

        console.log("access_token>>> ", cookie.get("access_token"))
        console.log("refresh_token >>> ",await getToken("refresh_token"))


        if (await getToken("refresh_token") === undefined) {
            throw new Error("Session ID is undefined");
        }

        if (cookie.get("access_token") === undefined) {
            await refreshToken()
        }

        let data = await clientGetApi(api);

        if (data && data.status === 401) {
            await refreshToken()
            data = await clientGetApi(api);
        }
        return data;

    } catch (error) {
        //  window.location.href = '/login';
    }
}

// Ham fetch post tu dong
export const FetchClientPostApi = async (api: string, bodyData: any) => {
    try {

        if (await getToken("refresh_token") === undefined) {
            throw new Error("refresh token is undefined");
        }

        if (cookie.get("access_token") === undefined) {
            await refreshToken()
        }

        let data = await clientPostPutApi(api, bodyData, "POST");

        if (data && data.status === 401) {
            await refreshToken()
            data = await clientPostPutApi(api, bodyData, "POST");
        }
        return data;

    } catch (error) {
        window.location.href = '/login';
    }
}

// Ham fetch put api tu dong
export const FetchClientPutApi = async (api: string, bodyData: any) => {
    try {

        if (await getToken("refresh_token") === undefined) {
            throw new Error("refresh token is undefined");
        }

        if (cookie.get("access_token") === undefined) {
            await refreshToken()
        }

        let data = await clientPostPutApi(api, bodyData, "PUT");

        if (data && data.status === 401) {
            await refreshToken()
            data = await clientPostPutApi(api, bodyData, "PUT");
        }
        return data;

    } catch (error) {
        window.location.href = '/login';
    }
}




// Ham tao moi accesstoken
// export const refreshToken = async () => {
//     try {
//         const req: RefreshTokenRequest = {
//             refreshToken: cookie.get("refresh_token")
//         }

//         const res = await fetch(API.AUTH.REFRESH_TOKEN, {
//             method: "POST", // Đúng phương thức POST
//             headers: {
//                 Accept: "application/json, text/plain, */*",
//                 "Content-Type": "application/json", // Đặt Content-Type là JSON
//             },
//             body: JSON.stringify(req), // Gửi dữ liệu JSON
//         });
//         const data = await res.json();

//         // neu access token chua het han
//         if (data && data.status === 200) {
//             const authenticationResponse: AuthenticationResponse = data.result
//             await setAccessToken(authenticationResponse.accessToken)
//         }
//         // neu refresh token het han ra trang login
//         else {
//             throw new Error("Unauthorization");
//         }

//     } catch (error) {
//         window.location.href = "/login"
//     }
// }


// ham fetch post, put api mac dinh
export const clientPostPutApi = async (api: string, bodyData: any, methodReq: string) => {

    try {
        const res = await fetch(api, {
            method: methodReq, // Đúng phương thức
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("access_token")}`, // Set Authorization header
            },
            body: JSON.stringify(bodyData), // Gửi dữ liệu JSON
        });

        const data = await res.json();
        return data;
    } catch (error) {
    }
}



// ham fetch get api mac dinh
export const clientGetApi = async (api: string) => {

    try {
        const res = await fetch(api, {
            method: "GET", // Đúng phương thức
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json", // Đặt Content-Type là JSON
                Authorization: `Bearer ${cookie.get("access_token")}`, // Set Authorization header
            },
        });

        const data = await res.json();
        return data;
    } catch (error) {
    }
}

