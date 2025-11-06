"use client";
import { useState } from 'react';
import Head from 'next/head';

export default function TransactionHistory() {
  const [activeTab, setActiveTab] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // ข้อมูลตัวอย่าง
  const transactions = [
    {
      id: 'TX001',
      type: 'เติมเงิน',
      game: 'VALORANT',
      amount: 500,
      status: 'สำเร็จ',
      date: '2024-01-15 14:30',
      paymentMethod: 'บัตรเครดิต',
      gameImage: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=100&h=100&fit=crop'
    },
    {
      id: 'TX002',
      type: 'ซื้อสินค้า',
      game: 'Genshin Impact',
      item: 'Genesis Crystal x300',
      amount: 299,
      status: 'สำเร็จ',
      date: '2024-01-14 11:22',
      paymentMethod: 'PromptPay',
      gameImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=100&h=100&fit=crop'
    },
    {
      id: 'TX003',
      type: 'เติมเงิน',
      game: 'League of Legends',
      amount: 1000,
      status: 'สำเร็จ',
      date: '2024-01-12 09:45',
      paymentMethod: 'True Money Wallet',
      gameImage: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=100&h=100&fit=crop'
    },
    {
      id: 'TX004',
      type: 'ซื้อสินค้า',
      game: 'Apex Legends',
      item: 'Coins 1000',
      amount: 199,
      status: 'รอดำเนินการ',
      date: '2024-01-10 16:20',
      paymentMethod: 'บัตรเครดิต',
      gameImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop'
    },
    {
      id: 'TX005',
      type: 'เติมเงิน',
      game: 'Honkai: Star Rail',
      amount: 300,
      status: 'ยกเลิก',
      date: '2024-01-08 13:15',
      paymentMethod: 'PromptPay',
      gameImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop'
    }
  ];

  // กรองข้อมูลตามแท็บและสถานะ
  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = activeTab === 'all' || 
                     (activeTab === 'topup' && transaction.type === 'เติมเงิน') ||
                     (activeTab === 'purchase' && transaction.type === 'ซื้อสินค้า');
    
    const statusMatch = filterStatus === 'all' || transaction.status === filterStatus;
    
    return typeMatch && statusMatch;
  });

  // ฟังก์ชันสำหรับแสดงสถานะด้วยสีที่ต่างกัน
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'สำเร็จ': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'รอดำเนินการ': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'ยกเลิก': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'สำเร็จ': return '✅';
      case 'รอดำเนินการ': return '⏳';
      case 'ยกเลิก': return '❌';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Head>
        <title>ประวัติการทำรายการ | GAMEHUB TOPUP</title>
        <meta name="description" content="ประวัติการซื้อสินค้าและเติมเงิน" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            ประวัติการทำรายการ
          </h1>
          <p className="text-xl text-gray-300">ติดตามรายการเติมเงินและซื้อสินค้าทั้งหมดของคุณ</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-lg">ยอดเติมเงินรวม</p>
                <p className="text-3xl font-bold text-white">฿1,800</p>
              </div>
              <div className="text-4xl">💳</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-3xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-lg">ยอดซื้อสินค้ารวม</p>
                <p className="text-3xl font-bold text-white">฿498</p>
              </div>
              <div className="text-4xl">🛒</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-3xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-lg">จำนวนรายการทั้งหมด</p>
                <p className="text-3xl font-bold text-white">5 รายการ</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700 mb-6 shadow-xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'all', label: 'ทั้งหมด', icon: '📋' },
              { id: 'topup', label: 'เติมเงิน', icon: '💳' },
              { id: 'purchase', label: 'ซื้อสินค้า', icon: '🛒' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/30'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Status Filter and Count */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-300 font-medium">สถานะ:</span>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                <option value="all">ทั้งหมด</option>
                <option value="สำเร็จ">สำเร็จ</option>
                <option value="รอดำเนินการ">รอดำเนินการ</option>
                <option value="ยกเลิก">ยกเลิก</option>
              </select>
            </div>
            
            <div className="text-lg text-gray-300 bg-gray-700/50 px-4 py-2 rounded-xl">
              แสดง <span className="text-white font-bold">{filteredTransactions.length}</span> รายการ
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    รายการ
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    ประเภท
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    จำนวนเงิน
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    วันที่
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    การชำระเงิน
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/30 divide-y divide-gray-700">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={transaction.gameImage}
                            alt={transaction.game}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <div className="text-white font-semibold">{transaction.game}</div>
                            {transaction.item && (
                              <div className="text-sm text-gray-400">{transaction.item}</div>
                            )}
                            <div className="text-xs text-gray-500">#{transaction.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          transaction.type === 'เติมเงิน' 
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {transaction.type === 'เติมเงิน' ? '💳' : '🛒'}
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-white">
                          ฿{transaction.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-300 bg-gray-700/50 px-3 py-2 rounded-xl text-sm border border-gray-600">
                          {transaction.paymentMethod}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="text-gray-400 text-lg">
                        <div className="text-6xl mb-4">📭</div>
                        ไม่พบรายการที่ตรงกับการค้นหา
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              📥 ดาวน์โหลดรายงาน
            </h3>
            <p className="text-gray-300 mb-4">ส่งอีเมลรายงานการทำรายการไปยังอีเมลของคุณ</p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
              ขอรายงาน
            </button>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-3xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              ❓ มีปัญหาการทำรายการ?
            </h3>
            <p className="text-gray-300 mb-4">ติดต่อทีม support ของเราตลอด 24 ชั่วโมง</p>
            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105">
              ติดต่อ Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}