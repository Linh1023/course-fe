'use client'
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {  
  Shield, 
  ChevronRight,
  SlidersHorizontal,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { z } from 'zod';
// Password change schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Mật khẩu hiện tại là bắt buộc"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
  confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu mới"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu mới không khớp",
  path: ["confirmPassword"],
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

interface AccountCenterProps {
  onPasswordChange?: () => void;
  onContactEmail?: () => void;
}

const AccountCenter: React.FC<AccountCenterProps> = ({
  onPasswordChange, onContactEmail,
}) => {
  const [activeSection, setActiveSection] = useState<string>('password-security');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const securityItems = [
    {
      id: 'change-password',
      title: 'Đổi mật khẩu',
      onClick: () => setIsPasswordModalOpen(true)
    },
    {
      id: 'email-contact',
      title: 'Email liên hệ',
      onClick: onContactEmail
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordFormChange = (field: string, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSavePassword = () => {
    try {
      // Validate using zod schema
      changePasswordSchema.parse(passwordForm);
      
      // Clear any existing errors
      setErrors({});
      
      // Call the onPasswordChange callback if provided
      if (onPasswordChange) {
        onPasswordChange();
      }
      
      // Reset form and close modal
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsPasswordModalOpen(false);
      
      // Success message could be handled by parent component
      console.log('Đổi mật khẩu thành công!');
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set validation errors
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleClosePasswordModal = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
    setErrors({});
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 relative">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-white shadow-md"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
        w-80 bg-white border-r border-gray-200 p-6 h-full lg:h-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="text-gray-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <h2 className="text-gray-900 font-semibold mb-4">Cài đặt tài khoản</h2>
          <button
            onClick={() => {
              setActiveSection('password-security');
              closeSidebar();
            }}
            className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
              activeSection === 'password-security' 
                ? 'bg-red-50 text-red-600 border border-red-200' 
                : 'hover:bg-gray-100 text-gray-900'
            }`}
          >
            <Shield className="w-5 h-5 mr-3" />
            <span>Mật khẩu và bảo mật</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white lg:ml-0">
        <div className="max-w-4xl mx-auto">
          {/* Mobile spacing for menu button */}
          <div className="lg:hidden h-12 mb-4"></div>
          
          <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">
            Mật khẩu và bảo mật
          </h1>
          
          <div className="mb-6 sm:mb-8">
            <p className="text-gray-600 text-sm sm:text-base">
              Quản lý mật khẩu, tùy chọn đăng nhập và phương thức khôi phục.
            </p>
          </div>

          <div className="space-y-3">
            {securityItems.map((item) => (
              <Card 
                key={item.id}
                className="bg-white border-gray-200 hover:bg-gray-50 hover:border-red-200 transition-all duration-200 cursor-pointer shadow-sm"
                onClick={item.onClick}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium text-sm sm:text-base">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Đổi mật khẩu
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">
                Mật khẩu hiện tại
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordFormChange('currentPassword', e.target.value)}
                  className={`pr-10 ${errors.currentPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-600">{errors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                Mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordFormChange('newPassword', e.target.value)}
                  className={`pr-10 ${errors.newPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Nhập mật khẩu mới"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-600">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                Nhập lại mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordFormChange('confirmPassword', e.target.value)}
                  className={`pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Nhập lại mật khẩu mới"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClosePasswordModal}
              className="mt-3 sm:mt-0"
            >
              Đóng
            </Button>
            <Button
              type="button"
              onClick={handleSavePassword}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountCenter;