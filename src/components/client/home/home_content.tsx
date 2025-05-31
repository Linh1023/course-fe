"use client"
import { FetchClientGetApi } from "@/actions/client/fetch_client_api"
import { Button } from "../../ui/button"
import API from "@/api/api"
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/actions/server/token_store";
import { FetchServerGetApi, FetchServerPostApi, FetchServerPostApiNoToken } from "@/actions/server/fetch_server_api";
import { useLoadingContext } from "@/context/loading_context";
import { time } from "console";
import Link from "next/link";


const HomeContent = () => {

    const router = useRouter()
   const {startLoadingSpiner, stopLoadingSpiner} = useLoadingContext()
   

    const handleFetchData = async () => {
        startLoadingSpiner()

         await new Promise(resolve => setTimeout(resolve, 9000));

 
        const data = await FetchServerGetApi(API.AUTH.HELLO_TEST)
        if (data && data.status === 200) {
            console.log("call success >>> ", data)
        }
        
        stopLoadingSpiner()
    }

    return (
        <>
          <Button
                onClick={() => { handleFetchData() }}
            >Fetch dữ liệu</Button>
            <Link href="/admin">admin</Link>
        </>
    )
}

export default HomeContent