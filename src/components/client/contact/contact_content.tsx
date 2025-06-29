'use client'
import React, { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, XCircle } from "lucide-react";

const MyContact = () => {
  const [result, setResult] = useState("");
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    phone: ""
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: "" }));

    if (name === "email" && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: "Email không đúng định dạng" }));
      }
    }

    if (name === "phone" && value) {
      if (!validatePhone(value)) {
        setErrors(prev => ({ ...prev, phone: "Số điện thoại phải có 10-11 chữ số" }));
      }
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setResult("Đang gửi...");

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (!email && !phone) {
      setFormError("Vui lòng nhập email hoặc số điện thoại");
      setResult("");
      return;
    }

    if (email && !validateEmail(email)) {
      setFormError("Email không đúng định dạng");
      setResult("");
      return;
    }

    if (phone && !validatePhone(phone)) {
      setFormError("Số điện thoại phải có 10-11 chữ số");
      setResult("");
      return;
    }

    formData.append("access_key", "33e54409-dbb0-4a64-9527-e05b6238edab");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất.");
      (event.target as HTMLFormElement).reset();
    } else {
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
                <p className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer">0865 275 183</p>
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
                  trancuongtn82@gmail.com
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
                  src="https://res.cloudinary.com/moment-images/fb_cuong_ks6fqc"
                  alt="QR Facebook"
                  className="w-48 h-48 mx-auto object-contain border-4 border-white rounded-2xl shadow-lg group-hover:scale-105 transition-transform"
                />
                <p className="mt-4 text-gray-600">Quét mã QR để liên hệ qua Facebook <a href="https://www.facebook.com/tran.cuong.737360" className="text-blue-600 underline hover:text-blue-800" target="_blank">tran.cuong.737360</a></p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-red-500 text-white py-4 px-8 rounded-t-2xl">
                <h3 className="text-xl font-bold">Zalo</h3>
              </div>
              <div className="bg-gray-50 p-8 rounded-b-2xl border-2 border-t-0 border-red-200 group-hover:bg-red-50 transition-colors">
                <img
                  src="https://res.cloudinary.com/moment-images/zalocuong_whfcoa"
                  alt="QR Zalo"
                  className="w-48 h-48 mx-auto object-contain border-4 border-white rounded-2xl shadow-lg group-hover:scale-105 transition-transform"
                />
                <p className="mt-4 text-gray-600">Quét mã QR để chat qua Zalo <a href="https://zalo.me/0865275183" className="text-blue-600 underline hover:text-blue-800" target="_blank">0865 275 183</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Gửi Tin Nhắn Cho Chúng Tôi</h2>
            <p className="text-gray-600 text-lg">Điền thông tin và chúng tôi sẽ phản hồi trong thời gian sớm nhất</p>
          </div>

          <form className="max-w-4xl mx-auto space-y-8" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Họ và Tên *</label>
                <input
                  placeholder="Họ và tên của bạn"
                  className="w-full bg-gray-50 border-2 border-gray-200 p-3 rounded-xl outline-none focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-800"
                  type="text"
                  required
                  name="name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  name="email"
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  onChange={handleInputChange}
                  className={`w-full bg-gray-50 border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'
                    } p-3 rounded-xl outline-none focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-800`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
                <p className="text-xs text-gray-500">Ví dụ: example@gmail.com</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Số Điện Thoại</label>
              <input
                type="tel"
                placeholder="Số điện thoại của bạn"
                name="phone"
                pattern="[0-9]{10,11}"
                onChange={handleInputChange}
                className={`w-full bg-gray-50 border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'
                  } p-3 rounded-xl outline-none focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-800`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.phone}
                </p>
              )}
              <p className="text-xs text-gray-500">Nhập 10-11 chữ số (Ví dụ: 0987654321)</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Tin Nhắn *</label>
              <textarea
                rows={6}
                placeholder="Hãy chia sẻ với chúng tôi những gì bạn muốn..."
                required
                name="message"
                className="w-full bg-gray-50 border-2 border-gray-200 p-3 rounded-xl outline-none focus:border-red-500 focus:bg-white transition-all duration-300 resize-none text-gray-800"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
              >
                <Send size={20} />
                Gửi Tin Nhắn
              </button>
            </div>

            {formError && (
              <div className="text-center p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 animate-fade-in">
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle size={20} className="text-red-500" />
                  <span className="font-medium">{formError}</span>
                </div>
              </div>
            )}

            {result && (
              <div className={`text-center p-4 rounded-xl animate-fade-in ${result.includes('thành công')
                ? 'bg-green-50 text-green-800 border border-green-200'
                : result.includes('Đang gửi')
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                <div className="flex items-center justify-center gap-2">
                  {result.includes('thành công') && <CheckCircle size={20} className="text-green-500" />}
                  {result.includes('Đang gửi') && <Send size={20} className="text-blue-500 animate-pulse" />}
                  {result.includes('lỗi') && <XCircle size={20} className="text-red-500" />}
                  <span className="font-medium">{result}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MyContact;