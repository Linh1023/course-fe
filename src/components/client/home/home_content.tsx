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
        const data = await FetchServerGetApi(API.AUTH.HELLO_TEST)
        if (data && data.status === 200) {
            console.log("call success >>> ", data)
        }
    }

    return (
        <>
          <Button
                onClick={() => { handleFetchData() }}
            >Fetch dữ liệu</Button>
        </>
    )
}

export default HomeContent