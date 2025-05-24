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


import { LoginGoogleAction, LoginWithCode } from "@/actions/server/login_google_action";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { LoginServerAction } from "@/actions/server/login_action";
import { useLoadingContext } from "@/context/loading_context";

const LoginForm = () => {

  const router = useRouter();
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const { fetchGetCurrentAccount, currentAccount } = useCurrentAccountContext()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState(false)

  const {startLoadingSpiner, stopLoadingSpiner} = useLoadingContext()


  // cho nay de khi bi loi
  useEffect(() => {
    if (currentAccount != null) {
      fetchGetCurrentAccount()
    }

  }, [pathName])


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoadingSpiner()
    const req: LoginRequest = {
      username: username,
      password: password,
    }
    const res = await LoginServerAction(req);
    if (res && res.status === 200) {
      await fetchGetCurrentAccount()
      router.push("/")
    } else {
      setErrorLogin(true)
    }
    stopLoadingSpiner()
  }


  const handleLoginGoole = async () => {
    await LoginGoogleAction()
  }

  useEffect(() => {
    startLoadingSpiner()
    const fectAPI = async () => {
      const code = searchParams.get('code')

      if (code != null) {
        const req: AuthenticationRequest = {
          code: code,
        }
        const data = await LoginWithCode(req);

        if (data && data.status === 200) {
          await fetchGetCurrentAccount()
          router.push("/")
        }


      }
    }
    fectAPI()
    stopLoadingSpiner()
  }, [])


  return (
    <>

      <div className={cn("flex flex-col gap-6")}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">

            <form className="p-6 md:p-8 flex items-center justify-center min-h-[500px]" onSubmit={handleLogin}>
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

                {errorLogin && (<>
                  <div className="flex flex-col items-center text-center ">
                    <h1 className="font-bold text-[#FE4444]">Không đúng thông tin đăng nhập</h1>
                  </div>
                </>)}




                <div className="grid gap-2">
                  <Label htmlFor="email">Tài khoản</Label>
                  <Input
                    value={username}
                    id="email"
                    type="text"
                    placeholder="Tài khoản"
                    required
                    onChange={(e) => { setUsername(e.target.value);  setErrorLogin(false) }}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mật khẩu</Label>
                  </div>
                  <Input id="password" type="password" required
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrorLogin(false) }}
                  />
                </div>

                <Button type="submit" className="w-full bg-red-500 hover:bg-red-400"
                >
                  Đăng nhập
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Hoặc
                  </span>
                </div>

                <Button type="button" className="w-full text-black  bg-[#F1F5F9] hover:bg-[#ffff]"
                  onClick={() => { handleLoginGoole() }}
                >
                  <svg aria-hidden="true" className="native svg-icon iconGoogle" width="25" height="25" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18"></path><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17"></path><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"></path><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.8 4.8 0 0 1 4.48-3.3"></path></svg>
                  Đăng nhập với Google
                </Button>




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
