// pages/profile/page.tsx
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user || !user) return null;

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google.com':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case 'facebook.com':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        );
    }
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case 'google.com': return 'Google';
      case 'facebook.com': return 'Facebook';
      case 'password': return 'Email/Password';
      default: return provider;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">
                🎮
              </div>
              <h1 className="text-xl font-bold text-white">P2W TOPUP</h1>
            </Link>
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                กลับหน้าหลัก
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">โปรไฟล์ของฉัน</h2>
          <p className="text-gray-400">ข้อมูลบัญชีและรายละเอียดส่วนตัว</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 overflow-hidden mb-6">
          {/* Header with Background */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-5xl font-bold text-white border-4 border-gray-800 shadow-2xl">
                {user.email?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {user.email || 'ผู้ใช้งาน'}
                </h3>
                <div className="flex items-center gap-2 text-gray-400">
                  {getProviderIcon(user.provider?? "")}
                  <span className="text-sm">เข้าสู่ระบบด้วย {getProviderName(user.provider?? "")}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-xl border border-gray-700">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                </svg>
                <span className="text-xl font-bold text-white">
                  {user.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                </span>
              </div>
            </div>

            {/* Role Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full mb-8">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium text-purple-300">
                {user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'สมาชิก'}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  อีเมล
                </label>
                <div className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl">
                  <p className="text-white">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  เบอร์โทรศัพท์
                </label>
                <div className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl">
                  <p className="text-white">{user.phone || '-'}</p>
                </div>
              </div>

              {/* User ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                  </svg>
                  ยูสเซอร์ไอดี (UID)
                </label>
                <div className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl">
                  <p className="text-white font-mono text-sm truncate">{user.uid}</p>
                </div>
              </div>

              {/* Provider */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  วิธีการเข้าสู่ระบบ
                </label>
                <div className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl flex items-center gap-2">
                  {getProviderIcon(user.provider?? "")}
                  <p className="text-white">{getProviderName(user.provider?? "E-mail")}</p>
                </div>
              </div>


              {/* Last Login */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  เข้าสู่ระบบล่าสุด
                </label>
                <div className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl">
                  <p className="text-white">{formatDate(user.lastLogin)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-purple-600/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">ยอดรวมการเติม</p>
                <p className="text-2xl font-bold text-white">{user.topupHistory?.length || 0}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">ครั้ง</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">สำเร็จ</p>
                <p className="text-2xl font-bold text-white">
                  {user.topupHistory?.length || 0}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">รายการ</p>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-600/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">ยอดคงเหลือ</p>
                <p className="text-2xl font-bold text-white">
                  {user.balance.toLocaleString('th-TH', { minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">บาท</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">ข้อมูลส่วนตัว</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                ข้อมูลที่แสดงในหน้านี้เป็นข้อมูลที่คุณลงทะเบียนไว้กับระบบ หากต้องการแก้ไขข้อมูล กรุณาติดต่อฝ่ายบริการลูกค้า
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;