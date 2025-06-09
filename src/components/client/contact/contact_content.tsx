import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const MyContact = () => {
  return (
    <div className="p-10 max-w-6xl mx-auto space-y-12">
      {/* Phần liên hệ trực tiếp */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Liên hệ với chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded shadow flex items-center gap-3 ">
            <Phone className=" text-red-500" />
            <div>
              <p>088888888888</p>
              <p>088888888888</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded shadow flex items-center gap-3">
            <Mail className=" text-red-500" />
            <p>Nguoidung232312@gmail.com</p>
          </div>

          <div className="bg-gray-100  p-4 rounded shadow flex items-center gap-3">
            <MapPin className=" text-red-500" />
            <p>Bình Hưng Hòa A, Tân Phú, Thành Phố Hồ Chí Minh</p>
          </div>
        </div>

        {/* Mạng xã hội */}
        {/* Mạng xã hội - chèn ảnh QR */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="flex flex-col items-center">
            <p className="mb-2 font-medium">Facebook</p>
            <img
              src="/images/qr-facebook.png"
              alt="QR Facebook"
              className="w-60 h-60 object-contain border rounded shadow"
            />
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-2 font-medium">Zalo</p>
            <img
              src="/images/qr-zalo.png"
              alt="QR Zalo"
              className="w-60 h-60 object-contain border rounded shadow"
            />
          </div>
        </div>
      </div>

      {/* Phần form */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Điền vào form</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Tên"
            className="w-full bg-gray-100 p-3 rounded outline-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-100 p-3 rounded outline-none"
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="w-full bg-gray-100 p-3 rounded outline-none"
            />
          </div>

          <textarea
            rows={5}
            placeholder="Lời nhắn"
            className="w-full bg-gray-100 p-3 rounded outline-none resize-none"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyContact;
