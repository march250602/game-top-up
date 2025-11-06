"use client";
import { useState } from "react";
import Link from "next/link";

interface TopupHistoryItem {
  id: string;
  amount: number;
  date: string;
  method: string; // เช่น "TrueMoney", "PromptPay"
}

interface User {
  uid: string;
  email: string;
  balance: number;
  lastLogin?: string;
  phone?: string;
  provider?: string;
  role?: string;
  topupHistory?: string[];
}



interface UserMenuProps {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

export default function UserMenu({ user, isLoading, isLoggedIn, logout }: UserMenuProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg cursor-pointer">
            เข้าสู่ระบบ
          </button>
        </Link>
        <Link href="/register">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg cursor-pointer">
            สมัครสมาชิก
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-3">
      {/* Balance Display */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
        {isLoading ? (
          <div className="w-16 h-5 bg-gray-600 rounded animate-pulse"></div>
        ) : (
          <span className="text-yellow-400 font-bold">
            {user?.balance.toLocaleString("th-TH", { minimumFractionDigits: 2 })} ฿
          </span>
        )}
      </div>

      {/* Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            {user?.email.charAt(0)}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{user?.email}</p>
            <p className="text-xs text-gray-400">บัญชีของฉัน</p>
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
            <div className="p-2">
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700 rounded-lg text-white">
                โปรไฟล์
              </Link>
              <Link href="/orders" className="block px-4 py-2 hover:bg-gray-700 rounded-lg text-white">
                ประวัติการสั่งซื้อ
              </Link>
              <Link href="/topup" className="block px-4 py-2 hover:bg-gray-700 rounded-lg text-white">
                เติมเงิน
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-600/20 rounded-lg text-red-500 font-medium"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
