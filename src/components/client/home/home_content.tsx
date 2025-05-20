"use client"
import { FetchClientGetApi } from "@/actions/client/fetch_client_api"
import { Button } from "../../ui/button"
import API from "@/api/api"
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/actions/server/token_store";
import { FetchServerGetApi, FetchServerPostApi, FetchServerPostApiNoToken } from "@/actions/server/fetch_server_api";

const HomeContent = () => {

    const router = useRouter()

    const handleFetchData = async () => {

        console.log("click ")
        const data = await FetchClientGetApi(API.AUTH.HELLO_TEST)
        if (data && data.status === 200) {
            console.log("call success >>> ", data)
        }
    }

    const handleLogout = async () => {
        const req: RefreshTokenRequest = {
            refreshToken: await getToken("refresh_token")
        }
        const data = await FetchServerPostApi(API.REFRESH_TOKEN.DELETE_REFRESH_TOKEN, req)
        if (data && data.status === 200) {
            await removeToken("access_token")
            await removeToken("refresh_token")
            router.push("/login")
        }
    }


    return (
        <>
          <Button
                onClick={() => { handleFetchData() }}
            >Fetch dữ liệu</Button>
            <Button
                onClick={() => { handleLogout() }}
            >Đăng xuất</Button>
           <img
                src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
                alt="Image"
                className="h-[600px] w-[600px]"
             
              />
                        <img
                src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
                alt="Image"
                className="h-[600px] w-[600px]"
             
              />
          
        </>
    )
}

export default HomeContent