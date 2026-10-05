import React from 'react';
import { Calendar, Bell, CheckCircle2 } from 'lucide-react';

export default function DynamicIsland({ activeEvent, isExpanded, onExpandToggle }) {
  if (!activeEvent) {
    return (
      <div 
        className="mx-auto bg-black text-white rounded-full flex items-center justify-between px-3 transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
        style={{
          width: '120px',
          height: '28px',
          zIndex: 60,
        }}
        onClick={onExpandToggle}
      >
        <div className="w-3 h-3 rounded-full bg-[#121212] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a1f] border border-gray-800"></div>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#001f3f] opacity-50"></div>
      </div>
    );
  }

  return (
    <div 
      className="mx-auto bg-black/95 backdrop-blur-xl text-white transition-all duration-300 shadow-2xl flex items-center justify-between overflow-hidden cursor-pointer"
      style={{
        width: isExpanded ? '340px' : '205px',
        height: isExpanded ? '58px' : '30px',
        borderRadius: isExpanded ? '24px' : '16px',
        padding: isExpanded ? '8px 14px' : '2px 10px',
        zIndex: 60,
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
      onClick={onExpandToggle}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-xs flex-shrink-0">
          {activeEvent.type === 'appointment' ? (
            <Calendar size={11} className="text-white" />
          ) : activeEvent.type === 'booking_success' ? (
            <CheckCircle2 size={11} className="text-white" />
          ) : (
            <Bell size={11} className="text-white" />
          )}
        </div>
        <div className="text-right min-w-0">
          <p className="text-[10.5px] font-bold text-white truncate">
            {activeEvent.title || 'صالون نهى السني'}
          </p>
          {isExpanded && (
            <p className="text-[9.5px] text-amber-300 truncate mt-0.5">
              {activeEvent.subtitle || 'موعدك القادم غداً 5:30 م'}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded-full border border-amber-500/30 font-semibold">
          {activeEvent.badge || 'تنبيه'}
        </span>
      </div>
    </div>
  );
}

