"use client"
import { Facebook, Youtube } from "lucide-react"
import { usePathname } from "next/navigation"
import React, { useState } from "react"


const Footer = () => {
  const usePathName = usePathname()

  if (usePathName.includes("lesson"))
    return (
      <>

      </>)

  return (

    <>
      <footer className="bg-[#1f1f1f] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-around gap-8">
          {/* Logo + Social */}
          <div className="flex flex-col gap-4 min-w-[180px]">
            <div className="text-2xl font-semibold">Mạng xã hội</div>
            <div className="flex gap-4">
              
              <a href="https://www.facebook.com/tran.cuong.737360" target="_blank">
                <Facebook className="w-6 h-6 hover:text-red-500 cursor-pointer" />
              </a>

              <a href="https://zalo.me/0865275183" target="_blank">
              
                <span className="font-bold text-[19px] cursor-pointer hover:text-red-500"
                >
                  Zalo
                </span>
              </a>

            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-1 text-sm min-w-[180px]">
            <h4 className="font-semibold text-2xl mb-2">Liên hệ</h4>
            <p>Số điện thoại: 0865 275 183</p>
            <p>Email: trancuongtn82@gmail.com</p>
            <p>Địa chỉ: Bình Hưng Hòa A, Tân Phú, Thành Phố Hồ Chí Minh</p>
          </div>

          {/* About us */}
          <div className="flex flex-col  gap-1 text-sm min-w-[150px]">
            <h4 className="font-semibold text-2xl mb-2">Thông tin</h4>
            <p>Trang web cung cấp các khóa học trực tuyến chất lượng cao, phù hợp với nhiều trình độ.</p>
            <p>Học viên có thể truy cập mọi lúc, mọi nơi với nội dung được cập nhật liên tục.</p>
            <p>Nếu có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ chúng tôi để được hỗ trợ kịp thời.</p>
          </div>
        </div>
      </footer>


    </>

  )
}

export default Footer
