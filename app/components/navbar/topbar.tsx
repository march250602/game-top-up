export default function Topbar() {
  return (

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span>📞 บริการ 24/7</span>
              <span>⚡ เติมเร็ว ภายใน 5 นาที</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:underline">Facebook</a>
              <span>|</span>
              <a href="#" className="hover:underline">Line</a>
            </div>
          </div>
        </div>
      </div>
      );
}
