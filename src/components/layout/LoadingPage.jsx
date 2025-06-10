import Egg from '../ui/Egg';
import Sperm from '../ui/Sperm';

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 to-sky-300 flex items-center justify-center">

    <div className="relative w-full h-full flex items-center justify-center">
      <Egg />

      {/* Các tinh trùng bơi từ nhiều góc */}
      <Sperm delay={0} start={{ x: -300, y: 200 }} />
      <Sperm delay={1.2} start={{ x: 400, y: 300 }} />
      <Sperm delay={2.4} start={{ x: -200, y: -300 }} />

      {/* Text Loading */}
      <div className="absolute bottom-10 text-center text-white text-xl font-semibold animate-pulse">
        Đang tải dữ liệu...
      </div>
    </div>
    </div>
  );
}
