import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
          🎮
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">P2W TOPUP</h1>
          <p className="text-xs text-gray-400">เติมเกมออนไลน์ ง่าย รวดเร็ว</p>
        </div>
      </div>
    </Link>
  );
}
