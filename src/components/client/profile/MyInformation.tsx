'use client';
import { SquarePen } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const MyInformation = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone_number: '',
    birthdate: '',
    bio: '',
    sex: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving data:', formData);
    // Xử lý lưu dữ liệu ở đây
    setIsEditing(false);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-gray-200 my-2">
        <h1 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h1>
        <Button variant="outline" className='text-gray-700 mb-2'
          onClick={toggleEditing}>
          <SquarePen size={30}/>
        </Button>
      </div>
      <div className="space-y-6">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="example123@gmail.com"
                disabled = {true} // Disable input for email
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Nguyễn Văn A"
                disabled = {!isEditing} // Enable input only when editing
              />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="123456789"
                disabled = {!isEditing} // Enable input only when editing
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày sinh
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled ={!isEditing} // Enable input only when editing
             />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <div className="relative">
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              placeholder="Label"
              disabled ={!isEditing} // Enable textarea only when editing
            />
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giới tính
          </label>
          <div className="relative">
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white"
              disabled ={!isEditing} // Enable select only when editing
            >
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:hover:bg-red-400 focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition-colors"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default MyInformation;