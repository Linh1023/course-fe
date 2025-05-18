"use client";

import API from "@/api/api";
import { Button } from "../ui/button";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useEffect, useState } from "react";
import { FACEBOOK_CLIENT_ID } from "@/utils/env";
import { setAccessToken, setRefreshToken } from "@/actions/server/token_store";
import { FetchServerPostApiNoToken } from "@/actions/server/fetch_server_api";
import { useRouter } from "next/navigation";




const LoginForm = () => {

  const router = useRouter();

  // login fb
  const responseFacebook = async (response: any) => {
    const req: AuthenticationRequest = {
      accessToken: response.accessToken,
    }

    if (req) {
      const res = await FetchServerPostApiNoToken(API.AUTH.AUTH_FACEBOOK, req)
      if (res && res.status === 200) {
        const authentiactionResponse: AuthenticationResponse = res.result
        await setRefreshToken(authentiactionResponse.refreshToken)
        await setAccessToken(authentiactionResponse.accessToken)
        console.log("Backend response:", authentiactionResponse);
        router.push("/")
      }

    }
  };




  return (
    <>

      <FacebookLogin
        appId={FACEBOOK_CLIENT_ID!}
        onSuccess={responseFacebook}
        onFail={(error) => console.error(error)}
        onProfileSuccess={(profile) => console.log(profile)}
      />


    </>

  );
};

export default LoginForm;
