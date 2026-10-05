import React from 'react';
import { X, Bell, Calendar, Sparkles, Gift, CheckCircle, CheckCheck } from 'lucide-react';

export default function NotificationsModal({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkAllAsRead 
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center select-none">
      <div 
        className="w-full bg-white rounded-t-[32px] max-h-[85%] overflow-hidden flex flex-col shadow-2xl border-t border-pink-100 animate-slideUp text-right"
      >
        {/* Header */}
        <div className="p-3 border-b border-pink-50 flex items-center justify-between bg-white relative z-10 shadow-sm" dir="rtl">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-[#C2185B] flex items-center justify-center flex-shrink-0">
              <Bell size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[14px] font-bold text-[#880E4F] truncate">مركز الإشعارات</h3>
              <p className="text-[9.5px] text-gray-500 truncate">تنبيهات المواعيد، العروض ونقاط الولاء</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 mr-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[10px] font-bold text-[#C2185B] hover:underline"
            >
              قراءة الكل
            </button>
            <button 
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 active-press"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto app-scroll p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-[12px]">
              لا توجد إشعارات حالياً
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-2xl border transition-all flex items-start gap-2.5 ${
                  n.isRead 
                    ? 'bg-white border-pink-50 text-gray-700' 
                    : 'bg-[#FFF0F5]/70 border-pink-200 text-gray-900 shadow-2xs'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#C2185B] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {n.type === 'appointment' ? (
                    <Calendar size={15} />
                  ) : n.type === 'points' ? (
                    <Gift size={15} />
                  ) : n.type === 'offer' ? (
                    <Sparkles size={15} />
                  ) : (
                    <Bell size={15} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-[11.5px] font-bold text-[#880E4F] truncate">{n.title}</h4>
                    <span className="text-[9px] text-gray-400 flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[10.5px] text-gray-600 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
