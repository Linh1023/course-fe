"use client";

import API from "@/api/api";
import { Button } from "../ui/button";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useEffect, useState } from "react";
import { FACEBOOK_CLIENT_ID } from "@/api/env";

const LoginForm = () => {

  // Định nghĩa trực tiếp callback
  const responseFacebook = async (response: any) => {
    const req: AuthenticationRequest = {
      accessToken: response.accessToken,
    }
   
    console.log("req >>> ", req)
    
    if (req) {
      const res = await fetch(API.AUTH.AUTH_FACEBOOK, {
        method: 'POST',
        body: JSON.stringify( req ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const dataRes = await res.json();
      if (dataRes && dataRes.status === 200) {
        const authentiactionResponse: AuthenticationResponse = dataRes.result
        console.log("Backend response:", authentiactionResponse);
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
