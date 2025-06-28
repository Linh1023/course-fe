"use client";
import { Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MyConnect = () => {
  return (
    <>
      <section className="fixed bottom-0 right-0  z-50 shadow-sm py-2 px-1 ">
        <div className="flex flex-col  gap-2 items-center justify-center ">
          <div className="group ">
            <a
              href="https://www.facebook.com/tran.cuong.737360"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Facebook className="w-10 h-10 text-white" />
            </a>
          </div>

          {/* Zalo Link */}
          <div className="group">
            <a
              href="https://zalo.me/0865275183"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600  hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-white font-bold text-xl">Zalo</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyConnect;
