"use client"
import { FetchClientGetApi } from "@/actions/client/fetch_client_api"
import { Button } from "../../ui/button"
import API from "@/api/api"
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { getToken, removeRefreshToken } from "@/actions/server/token_store";
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
            cookie.remove("access_token");
            await removeRefreshToken()
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
        </>
    )
}

export default HomeContent