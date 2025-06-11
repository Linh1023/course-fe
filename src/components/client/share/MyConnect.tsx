import { Facebook, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyConnect = () => {
  return (
    <section className="fixed bottom-0 right-0  z-50 shadow-sm py-2 ">
      <div className="flex flex-col gap-2 items-center justify-center ">

        <a href="http://facebook.com/tran.cuong.737360" target="_blank" >
          <div className=" p-2 rounded-full bg-gray-100 shadow-md flex gap-4 items-center justify-center">

            <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#1877F2" stroke="#1565C0" stroke-width="2" />
              <path d="M45 25 L45 40 L40 40 L40 48 L45 48 L45 75 L53 75 L53 48 L60 48 L61 40 L53 40 L53 32 Q53 28 57 28 L61 28 L61 20 Q58 20 55 20 Q45 20 45 30 L45 25 Z" fill="white" />
            </svg>

          </div>
        </a>


        <a href="#" target="_blank">
          <div className=" p-2 rounded-full bg-gray-100 shadow-md flex gap-4 items-center justify-center">

            {/* <Facebook
            href=""
            className="w-10 h-10 hover:text-red-500 cursor-pointer rounded-full "
          /> */}

            <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#0084FF" stroke="#0066CC" stroke-width="2" />
              <path d="M25 35 Q25 25 35 25 L65 25 Q75 25 75 35 L75 55 Q75 65 65 65 L45 65 L35 75 L35 65 Q25 65 25 55 Z" fill="white" />
              <text x="50" y="48" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#0084FF">Zalo</text>
            </svg>
          </div>
        </a>

      </div>
    </section>
  );
};

export default MyConnect;
