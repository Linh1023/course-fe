"use client";

import API from "@/api/api";
import { Button } from "../../ui/button";

import { useEffect, useState } from "react";
import { setAccessToken, setRefreshToken } from "@/actions/server/token_store";
import { FetchServerPostApiNoToken } from "@/actions/server/fetch_server_api";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import { LoginAction } from "@/actions/server/login_action";
import { useCurrentAccountContext } from "@/context/current_account_context";

const LoginForm = () => {

  const router = useRouter();
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const { fetchGetCurrentAccount, currentAccount } = useCurrentAccountContext()

  // cho nay de khi bi loi
  useEffect(() => {
    if (currentAccount != null) {
      fetchGetCurrentAccount()
    }

  }, [pathName])



  const handleLogin = async () => {
    await LoginAction()
  }

  useEffect(() => {
    const fectAPI = async () => {
      const code = searchParams.get('code')

      if (code != null) {
        const req: AuthenticationRequest = {
          code: code,
        }
        const data = await FetchServerPostApiNoToken(API.AUTH.AUTH_GOOGLE, req);
        if (data && data.status === 200) {
          const authenticationResponse: AuthenticationResponse = data.result
          await setAccessToken(authenticationResponse.accessToken)
          await setRefreshToken(authenticationResponse.refreshToken)
          await fetchGetCurrentAccount()
          router.push("/")
        }
      }
    }

    fectAPI()
  }, [])


  return (
    <>

      <div className={cn("flex flex-col gap-6")}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">

            <form className="p-6 md:p-8 flex items-center justify-center min-h-[500px]">
              <div className="flex flex-col gap-6 w-full">

                <div className=" logo-mobile">
                  <img
                    src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
                    alt="Image"
                    className=" object-cover w-[100px] h-[100px] rounded-[100px]"
                  />
                </div >


                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Đăng nhập</h1>
                </div>

                <Button type="submit" className="w-full bg-red-500 hover:bg-red-400"
                  onClick={() => { handleLogin() }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Đăng nhập với Google
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Học tập mọi lúc, mọi nơi.
                  </span>
                </div>


              </div>
            </form>
            <div className="relative hidden bg-muted md:block">
              <img
                src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <Button
        onClick={() => { handleLogin() }}
      >Login Google</Button> */}

    </>

  );
};

export default LoginForm;
