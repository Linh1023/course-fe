"use server"
import { getSessionId } from "@/utils/session_store";

import { redirect } from 'next/navigation'; // Import hàm redirect



export const FetchServerPostApi = async (api: string,bodyData: any)=> {
    try {
        const res = await fetch(api, {
          method: "POST", // Đúng phương thức POST
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json", // Đặt Content-Type là JSON
          },
          body: JSON.stringify(bodyData), // Gửi dữ liệu JSON
          
        });
        const data = await res.json();
        if (data && data.status === 401) {

        }

        return data;
      } catch (error) {

      } 
}
