'use client';

import { SquarePen } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FetchClientPutApi } from '@/actions/client/fetch_client_api';
import API from '@/api/api';
import { toast } from "@/hooks/use-toast"
import { FetchServerGetApi } from '@/actions/server/fetch_server_api';
import { useCurrentAccountContext } from '@/context/current_account_context';



const MyInformation = () => {
  // console.log('Current Account:', currentProfile);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Chuẩn bị dữ liệu gửi lên API
      const bodyData = {
        name: formData.name,
        phoneNumber: formData.phone,
        detail: formData.bio,
        birthday: formData.birthdate ? new Date(formData.birthdate).toISOString().split('T')[0] : null,
        sex: formData.sex || null,
        avatarUrl: currentProfile?.avatarUrl // Giữ nguyên avatarUrl từ currentProfile
      };

      // Gọi API PUT
      const response = await FetchClientPutApi(API.PROFILE.CHANGE_PROFILE, bodyData);

      if (response && response.status === 200) {
        // Cập nhật formData với dữ liệu mới từ response
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
        toast({
          title: "Thành công",
          description: "Cập nhật thông tin cá nhân thành công!",
          variant: "default"
        });
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thông tin. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // Hiển thị loading nếu chưa có dữ liệu
  if (!currentProfile) {
    return (
      <div className="max-w-4xl mx-auto bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-gray-200 my-2">
        <h1 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h1>
        <Button
          variant="outline"
          className='text-white mb-2 bg-black hover:bg-black hover:text-white'
          onClick={toggleEditing}
          disabled={isSaving}
        >
          <SquarePen size={30} /> Chỉnh sửa
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
                disabled={true} // Email luôn disable
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
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50"
                placeholder="Nguyễn Văn A"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Phone and Birthdate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50"
                disabled={!isEditing}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50"
                disabled={!isEditing}
              />
            </div>
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