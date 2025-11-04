"use client";
// pages/index.tsx
import React, { useState } from 'react';
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


// Types
interface Game {
  id: string;
  name: string;
  image: string;
  category: string;
  discount?: number;
  hot?: boolean;
}

interface Promotion {
  id: string;
  image: string;
  title: string;
}

// Mock Data
const GAME_CATEGORIES = [
  { name: 'ทั้งหมด', icon: '🎮' },
  { name: 'ยอดนิยม', icon: '🔥' },
  { name: 'MOBA', icon: '⚔️' },
  { name: 'Battle Royale', icon: '🎯' },
  { name: 'RPG', icon: '🗡️' },
  { name: 'Casual', icon: '🎲' },
];

const PROMOTIONS: Promotion[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
    title: 'โปรโมชั่นพิเศษ'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
    title: 'ลดราคา 20%'
  },
];

const GAMES: Game[] = [
  {
    id: '1',
    name: 'Free Fire',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=300&fit=crop',
    category: 'Battle Royale',
    discount: 10,
    hot: true,
  },
  {
    id: '2',
    name: 'Mobile Legends',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop',
    category: 'MOBA',
    hot: true,
  },
  {
    id: '3',
    name: 'PUBG Mobile',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop',
    category: 'Battle Royale',
    discount: 5,
  },
  {
    id: '4',
    name: 'Genshin Impact',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=300&fit=crop',
    category: 'RPG',
    hot: true,
  },
  {
    id: '5',
    name: 'RoV',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=300&h=300&fit=crop',
    category: 'MOBA',
    discount: 15,
  },
  {
    id: '6',
    name: 'Call of Duty',
    image: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?w=300&h=300&fit=crop',
    category: 'Battle Royale',
  },
  {
    id: '7',
    name: 'Valorant',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=300&h=300&fit=crop',
    category: 'Battle Royale',
    hot: true,
  },
  {
    id: '8',
    name: 'League of Legends',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&h=300&fit=crop',
    category: 'MOBA',
  },
];

const PAYMENT_METHODS = [
  { name: 'ธนาคาร', icon: '🏦' },
  { name: 'TrueMoney', icon: '💳' },
  { name: 'PromptPay', icon: '📱' },
  { name: 'Rabbit LINE Pay', icon: '🐰' },
];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Simulated login state
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [user, setUser] = useState({ name: 'ผู้ใช้งาน', email: 'user@example.com', balance: 1250 });

  const filteredGames = GAMES.filter((game) => {
    const matchesCategory =
      selectedCategory === 'ทั้งหมด' ||
      (selectedCategory === 'ยอดนิยม' && game.hot) ||
      game.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Simulate login for testing (remove in production)
  React.useEffect(() => {
    // Check if user is logged in from localStorage or session
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span>📞 บริการ 24/7</span>
              <span>⚡ เติมเร็ว ภายใน 5 นาที</span>
              {isLoggedIn && (
                <span className="hidden md:inline">👋 สวัสดี, {user.name}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:underline">Facebook</a>
              <span>|</span>
              <a href="#" className="hover:underline">Line</a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                🎮
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">P2W TOPUP</h1>
                <p className="text-xs text-gray-400">เติมเกมออนไลน์ ง่าย รวดเร็ว</p>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาเกมที่ต้องการเติม..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pl-12 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
               <Link href="/login">
              <button className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>เข้าสู่ระบบ</span>
              </button>
              </Link>
               <Link href="/register">
              <button className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>สมัครสมาชิก</span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาเกมที่ต้องการเติม..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 pl-12 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Promotion Slider */}
        <div className="mb-8 relative overflow-hidden rounded-2xl">
          <div className="relative h-64 md:h-96">
            {PROMOTIONS.map((promo, index) => (
              <div
                key={promo.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {promo.title}
                    </h2>
                    <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors">
                      ดูเพิ่มเติม
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slider Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {PROMOTIONS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700">
            <div className="grid grid-cols-3 md:flex md:flex-wrap gap-2">
              {GAME_CATEGORIES.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="hidden md:inline">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">เกมยอดนิยม</h2>
            <button className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1">
              ดูทั้งหมด
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {game.discount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        -{game.discount}%
                      </div>
                    )}
                    {game.hot && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        🔥 HOT
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-medium text-sm truncate">
                      {game.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            ช่องทางการชำระเงิน
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method.name}
                className="bg-gray-700/50 rounded-xl p-4 text-center hover:bg-gray-700 transition-colors"
              >
                <div className="text-4xl mb-2">{method.icon}</div>
                <p className="text-white font-medium text-sm">{method.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">เติมเร็วทันใจ</h3>
            <p className="text-gray-300 text-sm">ระบบอัตโนมัติ ได้ไอเทมภายใน 1-5 นาที</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">ปลอดภัย 100%</h3>
            <p className="text-gray-300 text-sm">ระบบรักษาความปลอดภัยระดับสูง</p>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">บริการ 24/7</h3>
            <p className="text-gray-300 text-sm">ทีมงานพร้อมให้บริการตลอด 24 ชั่วโมง</p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">เกี่ยวกับเรา</h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            P2W TOPUP คือผู้ให้บริการเติมเงินเกมมือถือ บริษัทได้รับการจดทะเบียนอย่างถูกต้องตามกฎหมาย 
            มีความปลอดภัย เชื่อถือได้ ราคาถูก ทำรายการสะดวกรวดเร็วผ่านระบบอัตโนมัติบนเว็บไซต์ 
            และยังมีทีมงานแอดมินคอยให้บริการดูแล 24 ชั่วโมง
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
              </svg>
              Line
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">
                🎮
              </div>
              <h3 className="text-xl font-bold text-white">P2W TOPUP</h3>
            </div>
            <p className="text-gray-400 mb-2">เติมเกมออนไลน์ ง่าย รวดเร็ว ปลอดภัย</p>
            <p className="text-gray-500 text-sm">© 2024 P2W TOPUP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;