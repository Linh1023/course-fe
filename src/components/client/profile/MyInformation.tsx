'use client';

import { SquarePen } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FetchServerPutApi } from '@/actions/server/fetch_server_api';
import API from '@/api/api';
import { FetchServerGetApi } from '@/actions/server/fetch_server_api';
import { useCurrentAccountContext } from '@/context/current_account_context';
import { LoaderIcon } from "@/components/share/loading-icon"
import { toast } from "sonner"

const MyInformation = () => {
  const [currentProfile, setCurrentProfile] = useState<CurrentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {fetchGetCurrentAccount} = useCurrentAccountContext();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await FetchServerGetApi(API.PROFILE.CURRENT_PROFILE);
        if (response && response.status === 200) {
          setCurrentProfile(response.result);
        } else {
          setError('Failed to fetch profile');
        }
      } catch (err) {
        setError('Error fetching profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    birthdate: '',
    bio: '',
    sex: ''
  });

  // State cho validation errors
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    birthdate: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentProfile) {
      setFormData({
        email: currentProfile.email || '',
        name: currentProfile.name || '',
        phone: currentProfile.phoneNumber || '',
        birthdate: currentProfile.birthday ?
          new Date(currentProfile.birthday).toISOString().slice(0, 16) : '',
        bio: currentProfile.detail || '',
        sex: currentProfile.sex || ''
      });
    }
  }, [currentProfile]);

  // Hàm validate từng trường
  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Họ và tên là bắt buộc';
        }
        break;
      
      case 'phone':
        if (!value.trim()) {
          error = 'Số điện thoại là bắt buộc';
        } else if (!/^\d+$/.test(value)) {
          error = 'Số điện thoại chỉ được chứa các chữ số';
        } else if (value.length > 12) {
          error = 'Số điện thoại không được vượt quá 12 số';
        } else if (value.length < 10) {
          error = 'Số điện thoại phải có ít nhất 10 số';
        }
        break;
    
    }
    
    return error;
  };

  // Validate tất cả các trường bắt buộc
  const validateAllFields = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      birthdate: validateField('birthdate', formData.birthdate)
    };
    
    setErrors(newErrors);
    
    // Trả về true nếu không có lỗi
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Xử lý đặc biệt cho số điện thoại - chỉ cho phép nhập số
    if (name === 'phone') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 12) {
        setFormData(prev => ({
          ...prev,
          [name]: numbersOnly
        }));
        
        // Clear error khi user bắt đầu sửa
        if (errors[name as keyof typeof errors]) {
          setErrors(prev => ({
            ...prev,
            [name]: ''
          }));
        }
      }
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error khi user bắt đầu sửa các trường bắt buộc
    if (name === 'name' || name === 'birthdate') {
      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  // Validate khi blur khỏi trường
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'phone' || name === 'birthdate') {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSave = async () => {
    // Validate tất cả các trường trước khi lưu
    if (!validateAllFields()) {
      toast.error("Vui lòng kiểm tra và sửa các lỗi trong form");
      return;
    }

    setIsSaving(true);
    try {
      const bodyData = {
        name: formData.name,
        phoneNumber: formData.phone,
        detail: formData.bio,
        birthday: formData.birthdate ? new Date(formData.birthdate).toISOString().split('T')[0] : null,
        sex: formData.sex || null,
        avatarUrl: currentProfile?.avatarUrl
      };

      const response = await FetchServerPutApi(API.PROFILE.CHANGE_PROFILE, bodyData);

      if (response && response.status === 200) {
        setFormData({
          email: response.result.email || '',
          name: response.result.name || '',
          phone: response.result.phoneNumber || '',
          birthdate: response.result.birthday ?
            new Date(response.result.birthday).toISOString().slice(0, 16) : '',
          bio: response.result.detail || '',
          sex: response.result.sex || ''
        });
        fetchGetCurrentAccount()
        
        toast.success("Cập nhật thông tin cá nhân thành công!") 
        setIsEditing(false);
        
        // Clear tất cả errors
        setErrors({
          name: '',
          phone: '',
          birthdate: ''
        });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Không thể cập nhật thông tin. Vui lòng thử lại.")
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      // Khi cancel, clear errors
      setErrors({
        name: '',
        phone: '',
        birthdate: ''
      });
    }
    setIsEditing(!isEditing);
  };

  // Hiển thị loading nếu chưa có dữ liệu
  if (!currentProfile) {
    return (
      <div className="max-w-4xl mx-auto bg-white">
        <div className="flex items-center justify-center h-64">
          <LoaderIcon className="mr-1.5 size-9 animate-spin" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full bg-white px-4 md:p-0 mb-[20px]">
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-gray-200 my-2">
        <h1 className="text-lg font-semibold text-gray-900">
          Thông tin cá nhân
        </h1>

        <Button
          variant="outline"
          className="text-white mb-2 bg-red-500 hover:bg-red-400 p-2 flex items-center justify-center"
          onClick={toggleEditing}
          disabled={isSaving}
        >
          <SquarePen size={24} />
          <span className="hidden md:inline ml-2">Chỉnh sửa</span>
        </Button>
      </div>

      <div className="space-y-6">
        {/* Email and Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="example123@gmail.com"
                disabled={true}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors disabled:bg-gray-50 ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Nguyễn Văn A"
                disabled={!isEditing}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Phone and Birthdate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors disabled:bg-gray-50 ${
                  errors.phone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="0123456789"
                disabled={!isEditing}
                maxLength={12}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors disabled:bg-gray-50 ${
                  errors.birthdate 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                disabled={!isEditing}
              />
            </div>
            {errors.birthdate && (
              <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
            )}
          </div>
        </div>

        {/* Bio */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none disabled:bg-gray-50"
              placeholder="Mô tả về bản thân..."
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giới tính
          </label>
          <div className="relative">
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white disabled:bg-gray-50"
              disabled={!isEditing}
            >
              <option value="">Chọn giới tính</option>
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

      {/* Save Button - chỉ hiển thị khi đang editing */}
      {isEditing && (
        <div className="flex justify-end mt-8">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-400 focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition-colors"
          >
            {isSaving ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyInformation;