"use client";

import API from "@/api/api";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import { setAccessToken, setRefreshToken } from "@/actions/server/token_store";
import { FetchServerPostApiNoToken } from "@/actions/server/fetch_server_api";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { LoginAction } from "@/actions/server/login_action";

const LoginForm = () => {

  const router = useRouter();
  const searchParams = useSearchParams();


  const handleLogin = async () => {
    await LoginAction()
  }

  useEffect(() => {
    const fectAPI = async () => {
      const code = searchParams.get('code')
      console.log("code >>> ", code);
      if (code != null) {
        const req: AuthenticationRequest = {
          accessToken: code,
        }
        const data = await FetchServerPostApiNoToken(API.AUTH.AUTH_GOOGLE, req);
        if (data && data.status === 200) {
          console.log("Login successfull >>> ", data)
        }
      }
    }


    fectAPI()
  }, [])

  return (
    <>

      <Button
        onClick={() => { handleLogin() }}
      >Login Google</Button>

    </>

  );
};

export default LoginForm;
