import React, { useEffect } from 'react';
import { Bell, X, Calendar, Sparkles, Gift, CheckCircle } from 'lucide-react';

export default function NotificationBanner({ notification, onClose, onClick }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  return (
    <div 
      className="absolute top-[60px] left-2.5 right-2.5 z-[60] transition-all duration-500 ease-out cursor-pointer select-none"
      style={{
        animation: 'dropDownBanner 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={() => {
        if (onClick) onClick(notification);
        onClose();
      }}
    >
      <div className="bg-[#1C1C1E]/95 backdrop-blur-2xl text-white rounded-[24px] p-3 shadow-2xl border border-white/15 flex items-start gap-2.5 hover:scale-[1.01] transition-transform">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#880E4F] via-[#C2185B] to-[#FFD700] flex items-center justify-center flex-shrink-0 shadow-md border border-white/20">
          {notification.type === 'appointment' ? (
            <Calendar size={18} className="text-white" />
          ) : notification.type === 'points' ? (
            <Gift size={18} className="text-amber-300" />
          ) : notification.type === 'booking_success' ? (
            <CheckCircle size={18} className="text-emerald-400" />
          ) : (
            <Sparkles size={18} className="text-pink-300" />
          )}
        </div>

        <div className="flex-1 text-right min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-[9.5px] text-gray-400 font-medium flex items-center gap-1">
              <span>صالون نهى السني</span>
              <span>•</span>
              <span>الآن</span>
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-gray-400 hover:text-white p-0.5 rounded-full"
            >
              <X size={12} />
            </button>
          </div>
          <h4 className="text-[12px] font-bold text-white leading-tight mb-0.5 truncate">
            {notification.title}
          </h4>
          <p className="text-[10.5px] text-gray-200 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
}
