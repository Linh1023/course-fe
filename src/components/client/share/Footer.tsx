import { Facebook, Youtube  } from "lucide-react"
import React from "react"


const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-around gap-8">
        {/* Logo + Social */}
        <div className="flex flex-col gap-4 min-w-[180px]">
          <div className="text-2xl font-semibold">YourLogo</div>
          <div className="flex gap-4">
            <Facebook href="" className="w-6 h-6 hover:text-red-500 cursor-pointer" />
            <Youtube href="" className="w-6 h-6 hover:text-red-500 cursor-pointer" />
         
          </div>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col gap-1 text-sm min-w-[180px]">
          <h4 className="font-semibold text-2xl mb-2">Contact Us</h4>
          <p>Số điện thoại: 0888888888</p>
          <p>Email: abc@gmail.com</p>
          <p>Địa chỉ: Tân Phú, Thành Phố Hồ Chí Minh</p>
        </div>

        {/* About us */}
        <div className="flex flex-col  gap-1 text-sm min-w-[150px]">
          <h4 className="font-semibold text-2xl mb-2">About us</h4>
          <p>Giới thiệu</p>
          <p>Điều khoản</p>
          <p>Liên hệ</p>
          <p>Bảo mật</p>
        </div>

        {/* Links */}
        <div className="flex flex-col  gap-1 text-sm min-w-[150px]">
          <h4 className="font-semibold text-2xl mb-2">Links</h4>
          <p>Khóa học</p>
          <p>Khóa học</p>
          <p>YourLogo</p>
          <p>YourLogo</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
