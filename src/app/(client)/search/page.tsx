"use server"

import { FetchServerGetApi, FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import Search from "@/components/client/search/search";
import { ReadonlyURLSearchParams } from "next/navigation"




const SearchPage = () => {

    return(
        <>
        <Search/>
        </>
    )
}
export default SearchPage

