'use client'
import React, { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

const MyContact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Đang gửi...");

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "24878b1c-886f-4633-814e-479125a1e3d9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất.");
      (event.target as HTMLFormElement).reset();
    } else {
      console.log("Error", data);
      setResult(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy kết nối với chúng tôi ngay hôm nay!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-56 flex flex-col">
              <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform flex-shrink-0">
        <Phone className="text-white" size={24} />
      </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Điện Thoại</h3>
              <div className="space-y-2 flex-1">
                <p className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer">088888888888</p>
                <p className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer">088888888888</p>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-56 flex flex-col">
              <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform flex-shrink-0">
        <Mail className="text-white" size={24} />
      </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Email</h3>
              <div className="flex-1">
                <p className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer">
                  Nguoidung232312@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-56 flex flex-col">
               <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform flex-shrink-0">
        <MapPin className="text-white" size={24} />
      </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Địa Chỉ</h3>
              <div className="flex-1">
                <p className="text-gray-600">
                  Bình Hưng Hòa A, Tân Phú, Thành Phố Hồ Chí Minh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media QR Codes */}
        <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Kết Nối Qua Mạng Xã Hội
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center group">
              <div className="bg-red-500 text-white py-4 px-8 rounded-t-2xl">
                <h3 className="text-xl font-bold">Facebook</h3>
              </div>
              <div className="bg-gray-50 p-8 rounded-b-2xl border-2 border-t-0 border-red-200 group-hover:bg-red-50 transition-colors">
                <img
                  src="/images/qr-facebook.png"
                  alt="QR Facebook"
                  className="w-48 h-48 mx-auto object-contain border-4 border-white rounded-2xl shadow-lg group-hover:scale-105 transition-transform"
                />
                <p className="mt-4 text-gray-600">Quét mã QR để theo dõi Facebook</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-red-500 text-white py-4 px-8 rounded-t-2xl">
                <h3 className="text-xl font-bold">Zalo</h3>
              </div>
              <div className="bg-gray-50 p-8 rounded-b-2xl border-2 border-t-0 border-red-200 group-hover:bg-red-50 transition-colors">
                <img
                  src="/images/qr-zalo.png"
                  alt="QR Zalo"
                  className="w-48 h-48 mx-auto object-contain border-4 border-white rounded-2xl shadow-lg group-hover:scale-105 transition-transform"
                />
                <p className="mt-4 text-gray-600">Quét mã QR để chat qua Zalo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Gửi Tin Nhắn Cho Chúng Tôi</h2>
            <p className="text-gray-600 text-lg">Điền thông tin và chúng tôi sẽ phản hồi trong thời gian sớm nhất</p>
          </div>

          <form className="max-w-4xl mx-auto space-y-8" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Email *</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  name="email"
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-xl outline-none focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Họ và Tên *</label>
                <input
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-xl outline-none focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-800"
                  type="text"
                  required
                  name="name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Tin Nhắn *</label>
              <textarea
                rows={6}
                placeholder="Hãy chia sẻ với chúng tôi những gì bạn muốn..."
                required
                name="message"
                className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-xl outline-none focus:border-red-500 focus:bg-white transition-all duration-300 resize-none text-gray-800"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
              >
                <Send size={20} />
                Gửi Tin Nhắn
              </button>
            </div>

            {result && (
              <div className={`text-center p-4 rounded-xl ${
                result.includes('thành công') 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : result.includes('Đang gửi') 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  {result.includes('thành công') && <CheckCircle size={20} />}
                  <span className="font-medium">{result}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyContact;