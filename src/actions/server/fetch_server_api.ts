"use server"
import API from '@/api/api';
import { getToken, removeToken, setAccessToken } from './token_store';


import { redirect } from 'next/navigation'; // Import hàm redirect


// Ham fetch post khong can token
export const FetchServerPostApiNoToken = async (api: string, bodyData: any) => {
  try {
    const res = await fetch(api, {
      method: "POST", // Đúng phương thức
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
      },
      body: JSON.stringify(bodyData), // Gửi dữ liệu JSON
    });

    const data = await res.json();
    return data;
  } catch (error) {
  }
}


// Ham fetch post api khi can access token tu dong
export const FetchServerPostApi = async (api: string, bodyData: any) => {
  try {
    const refresh_token = await getToken("refresh_token")
    const access_token = await getToken("access_token")
    

    // if (refresh_token === undefined) {
    //   throw new Error("Session ID is undefined");
    // }

    if (access_token === undefined) {
      await refreshToken()
    }

    let data = await serverPostPutApi(api, bodyData, "POST");

    if (data && data.status === 401) {
      await refreshToken()
      data = await serverPostPutApi(api, bodyData, "POST");
    }
    return data;

  } catch (error) {
    redirect('/login');
  }
}



// Ham fetch put api khi can access token tu dong
export const FetchServerPutApi = async (api: string, bodyData: any) => {
  try {

    const refresh_token = await getToken("refresh_token")
    const access_token = await getToken("access_token")

    // if (refresh_token === undefined) {
    //   throw new Error("Session ID is undefined");
    // }

    if (access_token === undefined) {
      await refreshToken()
    }

    let data = await serverPostPutApi(api, bodyData, "PUT");

    if (data && data.status === 401) {
      await refreshToken()
      data = await serverPostPutApi(api, bodyData, "PUT");
    }
    return data;

  } catch (error) {
    redirect('/login');
  }
}


// Ham fetch get api khi can access token tu dong
export const FetchServerGetApi = async (api: string) => {
  try {
    const refresh_token = await getToken("refresh_token")
    const access_token = await getToken("access_token")

    // if ( refresh_token === undefined) {
    //   throw new Error("Session ID is undefined");
    // }

    if (access_token === undefined) {
      await refreshToken()
    }

    let data = await serverGetApi(api);

    if (data && data.status === 401) {
      await refreshToken()
      data = await serverGetApi(api);
    }
    return data;

  } catch (error) {
    redirect('/login');
  }
}

// Ham fetch get api khi can access token tu dong
export const FetchServerGetApiNoRediect = async (api: string) => {
    const access_token = await getToken("access_token")

    if (access_token === undefined) {
      await refreshTokenNoRediect()
    }

    let data = await serverGetApi(api);

    if (data && data.status === 401) {
      await refreshTokenNoRediect()
      data = await serverGetApi(api);
    }
    return data;
}


export const refreshTokenNoRediect = async () => {
    const req: RefreshTokenRequest = {
      refreshToken: await getToken("refresh_token")
    }

    const res = await fetch(API.AUTH.REFRESH_TOKEN, {
      method: "POST", // Đúng phương thức POST
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
      },
      body: JSON.stringify(req), // Gửi dữ liệu JSON
    });
    const data = await res.json();

    // neu access token chua het han
    // neu refresh token het han ra trang login

}




// Ham tao moi accesstoken
export const refreshToken = async () => {
  try {
    const req: RefreshTokenRequest = {
      refreshToken: await getToken("refresh_token")
    }

    const res = await fetch(API.AUTH.REFRESH_TOKEN, {
      method: "POST", // Đúng phương thức POST
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
      },
      body: JSON.stringify(req), // Gửi dữ liệu JSON
    });
    const data = await res.json();

    // neu access token chua het han
    if (data && data.status === 200) {
      const authenticationResponse: AuthenticationResponse = data.result
     await setAccessToken(authenticationResponse.accessToken)
    }
    // neu refresh token het han ra trang login
    else {
      throw new Error("Unauthorization");
    }

  } catch (error) {
    await removeToken("access_token")
    await removeToken("refresh_token")
    redirect('/login');
  }
}

// ham fetch post, put api mac dinh
export const serverPostPutApi = async (api: string, bodyData: any, methodReq: string) => {

  try {
    const res = await fetch(api, {
      method: methodReq, // Đúng phương thức
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
        Authorization: `Bearer ${await getToken("access_token")}`, // Set Authorization header
      },
      body: JSON.stringify(bodyData), // Gửi dữ liệu JSON
    });

    const data = await res.json();
    return data;
  } catch (error) {
  }
}



// ham fetch get api mac dinh
export const serverGetApi = async (api: string) => {

  try {
    const res = await fetch(api, {
      method: "GET", // Đúng phương thức
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
        Authorization: `Bearer ${await getToken("access_token")}`, // Set Authorization header
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
  }
}


