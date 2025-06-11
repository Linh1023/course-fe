"use server"

import { FetchServerGetApi, FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import Search from "@/components/client/search/search";
import MyConnect from "@/components/client/share/MyConnect";
import { ReadonlyURLSearchParams } from "next/navigation"




const SearchPage = () => {

    return(
        <>
        <Search/>
          <MyConnect/>
        </>
    )
}
export default SearchPage

