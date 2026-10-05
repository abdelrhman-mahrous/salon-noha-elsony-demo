import React from 'react';
import { X, QrCode, Sparkles, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function QrCodeModal({ appointment, isOpen, onClose }) {
  if (!isOpen || !appointment) return null;

  // 12x12 simple pseudo-QR grid
  const qrGrid = Array.from({ length: 144 }, (_, i) => {
    const row = Math.floor(i / 12);
    const col = i % 12;
    // Corners detection
    const isTopLeft = row < 4 && col < 4;
    const isTopRight = row < 4 && col > 7;
    const isBottomLeft = row > 7 && col < 4;
    const isCorner = isTopLeft || isTopRight || isBottomLeft;
    const isRandom = ((row * 7 + col * 13 + 5) % 3 === 0);
    return isCorner || isRandom;
  });

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div 
        className="w-full max-w-xs bg-white rounded-[28px] p-5 shadow-2xl border border-pink-100 animate-scaleUp text-center relative space-y-3.5"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 left-3 w-7 h-7 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-gray-400 hover:text-gray-600 active-press"
        >
          <X size={14} />
        </button>

        <div className="pt-1">
          <span className="text-[9.5px] font-bold text-[#C2185B] bg-pink-50 px-2 py-0.5 rounded-full inline-block mb-1">
            الدخول الذاتي السريع بالصالون
          </span>
          <h3 className="text-[14.5px] font-bold text-[#880E4F]">
            باركود تأكيد الحضور ✨
          </h3>
          <p className="text-[10.5px] text-gray-500">
            أظهري هذا الباركود لموظفة الاستقبال أو الكاشير عند وصولك
          </p>
        </div>

        {/* QR Box */}
        <div className="p-3 bg-white border-2 border-dashed border-[#C2185B]/40 rounded-2xl inline-block shadow-xs">
          <div className="w-40 h-40 grid grid-cols-12 gap-0.5 bg-white p-1">
            {qrGrid.map((isBlack, i) => (
              <div
                key={i}
                className={`rounded-[1px] ${
                  isBlack ? 'bg-[#880E4F]' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#FFF0F5]/80 p-2.5 rounded-xl border border-pink-100 text-[11px] space-y-1 text-right">
          <div className="flex justify-between">
            <span className="text-gray-500">كود الحجز:</span>
            <span className="font-mono font-bold text-[#880E4F]">{appointment.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">الخدمة:</span>
            <span className="font-bold text-[#880E4F] truncate max-w-[150px]">{appointment.serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">الموعد:</span>
            <span className="font-bold text-[#880E4F]">{appointment.date} - {appointment.time}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl text-[11.5px] font-bold shadow-xs active-press"
        >
          تم
        </button>
      </div>
    </div>
  );
}
