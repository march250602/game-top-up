"use client";

import React, { useState } from 'react';
import axios from 'axios';
const TopupPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [angpaoLink, setAngpaoLink] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleQuickAmount = (value: number) => {
    setSelectedAmount(value);
    setAmount(value.toString());
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
    setSelectedAmount(null);
  };

  const handleAngpaoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAngpaoLink(e.target.value);
  };

  const validateAngpaoLink = (link: string): boolean => {
  // ตรวจสอบว่าเป็นลิงก์ TrueMoney Angpao ที่ถูกต้อง
  const angpaoPatterns = [
    /gift\.truemoney\.com\/campaign\/\?v=/i,
    /truemoney\.com\/angpao\/.*[?&]v=/i,
    /tm\.co\/.*[?&]v=/i,
    /true\.me\/.*[?&]v=/i,
    /truemoney\.co\/angpao\/.*[?&]v=/i
  ];
  
  return angpaoPatterns.some(pattern => pattern.test(link));
};
  const handleSubmit = async () => {
  if (!amount || parseInt(amount) < 10) {
    alert('กรุณากรอกจำนวนเงินขั้นต่ำ 10 บาท');
    return;
  }

  if (!angpaoLink.trim()) {
    alert('กรุณากรอกลิงก์อั่งเปา TrueMoney');
    return;
  }

  // แยกส่วนหลัง ?v= จากลิงก์
  const extractAngpaoCode = (link: string): string | null => {
    const match = link.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };


  const angpaoCode = extractAngpaoCode(angpaoLink);
  console.log(angpaoCode)
  if (!angpaoCode) {
    alert('กรุณากรอกลิงก์อั่งเปา TrueMoney ที่ถูกต้อง (ต้องมีส่วนหลัง ?v=)');
    return;
  }

  setIsProcessing(true);

  try {
    // เรียกใช้ API route ของเราแทน
    const response = await axios.post('/api/topup', {
      angpaoCode: angpaoCode,
      amount: parseInt(amount)
    });
    
    console.log('API Response:', response.data);
    
    if (response.data.success === true) {
      setIsProcessing(false);
      setIsSubmitted(true);
    } else {
      // handle errors...
    }
    
  } catch (error: any) {
    console.error('Error:', error);
    setIsProcessing(false);
    
    if (error.response) {
      const errorMessage = error.response.data.message || 'ไม่สามารถเติมเงินได้';
      alert(errorMessage);
    } else {
      alert('❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  }
};

  const resetForm = () => {
    setAmount('');
    setSelectedAmount(null);
    setAngpaoLink('');
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              🎁
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-white">GAMEHUB TOPUP</h1>
              <p className="text-sm text-gray-400">เติมเงินผ่าน TrueMoney Angpao</p>
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700 shadow-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">เติมเงินเข้าระบบ</h2>
              <p className="text-gray-400">เฉพาะช่องทาง TrueMoney Angpao เท่านั้น</p>
            </div>

            <div className="space-y-6">
              {/* Quick Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  เลือกจำนวนเงิน
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {quickAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleQuickAmount(value)}
                      className={`py-4 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                        selectedAmount === value
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/50'
                          : 'bg-gray-900/50 border border-gray-700 text-gray-300 hover:border-red-500'
                      }`}
                    >
                      ฿{value.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  หรือกรอกจำนวนเงิน <span className="text-gray-500">(ขั้นต่ำ 10 บาท)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleCustomAmount}
                    className="w-full px-4 py-4 pl-12 bg-gray-900/50 border border-gray-700 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                    placeholder="0"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                    ฿
                  </div>
                </div>
                {amount && parseInt(amount) >= 10 && (
                  <p className="mt-2 text-sm text-green-400">
                    ✓ จำนวนเงิน: ฿{parseInt(amount).toLocaleString()} บาท
                  </p>
                )}
              </div>

              {/* TrueMoney Angpao Link Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ลิงก์อั่งเปา TrueMoney <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={angpaoLink}
                    onChange={handleAngpaoLinkChange}
                    className="w-full px-4 py-4 pl-12 bg-gray-900/50 border border-gray-700 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                    placeholder="https://truemoney.com/angpao/..."
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-2xl">🎁</span>
                  </div>
                </div>
                {angpaoLink && !validateAngpaoLink(angpaoLink) && (
                  <p className="mt-2 text-sm text-red-400">
                    ⚠️ กรุณากรอกลิงก์อั่งเปา TrueMoney ที่ถูกต้อง
                  </p>
                )}
                {angpaoLink && validateAngpaoLink(angpaoLink) && (
                  <p className="mt-2 text-sm text-green-400">
                    ✓ ลิงก์อั่งเปาถูกต้อง
                  </p>
                )}
              </div>

              {/* Payment Method Info */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  ช่องทางการชำระเงิน
                </label>
                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-3xl">🎁</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">TrueMoney Angpao</h3>
                    <p className="text-sm text-gray-400">ส่งลิงก์อั่งเปาเพื่อเติมเงิน</p>
                    <p className="text-xs text-gray-500 mt-1">รองรับเฉพาะลิงก์อั่งเปาเท่านั้น</p>
                  </div>
                  <div className="text-green-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* How to Get Angpao Link */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold text-blue-400 mb-2">วิธีรับลิงก์อั่งเปา</p>
                    <ol className="space-y-2 text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                        เปิดแอป TrueMoney และเลือก "ส่งอั่งเปา"
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                        ตั้งค่าจำนวนเงินและส่งให้เพื่อน
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                        คัดลอกลิงก์อั่งเปาและนำมาใส่ในช่องด้านบน
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!amount || parseInt(amount) < 10 || !angpaoLink.trim() || !validateAngpaoLink(angpaoLink) || isProcessing}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังตรวจสอบลิงก์อั่งเปา...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    ยืนยันการเติมเงิน
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Success Page */
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700 shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4 shadow-lg shadow-green-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">ส่งคำขอเติมเงินสำเร็จ!</h2>
              <p className="text-gray-400">ระบบกำลังตรวจสอบลิงก์อั่งเปาของคุณ</p>
            </div>

            {/* Transaction Details */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">จำนวนเงิน</span>
                <span className="text-green-400 font-bold text-xl">฿{parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">ช่องทางการชำระเงิน</span>
                <span className="text-white font-semibold flex items-center gap-2">
                  <span className="text-2xl">🎁</span>
                  TrueMoney Angpao
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">สถานะ</span>
                <span className="flex items-center gap-2 text-yellow-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
                  </span>
                  รอการตรวจสอบ
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400">ลิงก์อั่งเปา</span>
                <span className="text-blue-400 text-sm text-right break-all max-w-[200px]">
                  {angpaoLink}
                </span>
              </div>
            </div>

            {/* Processing Info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-blue-400 mb-2">ขั้นตอนต่อไป</p>
                  <ul className="space-y-2 text-gray-400">
                    <li>• ระบบจะตรวจสอบลิงก์อั่งเปาภายใน 1-5 นาที</li>
                    <li>• เงินจะถูกเติมเข้าเกมโดยอัตโนมัติหลังตรวจสอบสำเร็จ</li>
                    <li>• คุณสามารถตรวจสอบสถานะได้ในหน้า "ประวัติการทำรายการ"</li>
                    <li>• หากมีปัญหา กรุณาติดต่อทีม Support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={resetForm}
                className="py-3 px-4 bg-gray-900/50 border border-gray-700 hover:border-gray-600 text-white font-medium rounded-xl transition-all"
              >
                ← เติมเงินอีกครั้ง
              </button>
              <button
                onClick={() => window.location.href = '/transaction-history'}
                className="py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/50"
              >
                📋 ดูประวัติการทำรายการ
              </button>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับสู่หน้าหลัก
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopupPage;