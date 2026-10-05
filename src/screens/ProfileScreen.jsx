import React from 'react';
import { 
  User, Award, Gift, Clock, ShieldCheck, Heart, 
  MapPin, Phone, MessageSquare, ChevronLeft, LogOut,
  Sparkles, Wallet, HelpCircle, Star, QrCode
} from 'lucide-react';
import { salonInfo } from '../data/mockData';

export default function ProfileScreen({ user, onResetData, onTriggerPointsReward }) {
  return (
    <div className="screen-scroll flex-1 min-h-0 text-right bg-[#FFF0F5] select-none">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#FFF0F5]/95 backdrop-blur-md px-4 pt-2.5 pb-2.5 border-b border-pink-100/70 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#880E4F]">الملف الشخصي والعضوية 👑</h2>
        <span className="text-[10px] bg-pink-100 text-[#C2185B] font-bold px-2 py-0.5 rounded-full">
          {user.membershipTier}
        </span>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* User Card */}
        <div className="bg-white rounded-[24px] border border-pink-100/90 p-3.5 shadow-xs flex items-center gap-3">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-[#C2185B]/40 shadow-xs" 
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-[14.5px] font-bold text-[#880E4F] leading-snug truncate">{user.name}</h3>
            <p className="text-[11px] text-gray-500">{user.phone}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[9.5px] text-[#C2185B] font-bold bg-[#FFF0F5] px-2 py-0.5 rounded-md border border-pink-100">
                ✨ عميلة نشطة منذ {user.memberSince}
              </span>
            </div>
          </div>
        </div>

        {/* Loyalty Points & Wallet VIP Card */}
        <div className="rounded-[24px] p-4 bg-gradient-to-r from-[#880E4F] via-[#C2185B] to-[#9C27B0] text-white shadow-md relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="text-[10px] text-pink-200 block font-medium">رصيد نقاط الولاء VIP</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-[24px] font-black tracking-tight">{user.points}</span>
                <span className="text-[11px] text-amber-300 font-bold">نقطة</span>
              </div>
              <span className="text-[10.5px] text-pink-100 opacity-90">
                تعادل خصم بقيمة <strong>{user.pointsValue} ج.م</strong>
              </span>
            </div>

            <div className="text-left">
              <span className="text-[10px] text-pink-200 block font-medium">المحفظة الإلكترونية</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-[20px] font-black">{user.walletBalance}</span>
                <span className="text-[11px] text-pink-100">ج.م</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/20 flex items-center justify-between relative z-10">
            <span className="text-[10.5px] text-pink-100 flex items-center gap-1">
              <Sparkles size={12} className="text-amber-300" />
              <span>اكسب 50 نقطة عند كل حجز وتقييم</span>
            </span>
            <button
              onClick={onTriggerPointsReward}
              className="px-2.5 py-1 bg-white text-[#C2185B] rounded-xl text-[10px] font-bold shadow-xs active-press"
            >
              شحن مكافأة
            </button>
          </div>
        </div>

        {/* Salon Branch & Support Info */}
        <div className="bg-white rounded-[22px] border border-pink-100/90 p-3.5 shadow-xs space-y-2">
          <h4 className="text-[12.5px] font-bold text-[#880E4F] flex items-center gap-1.5">
            <MapPin size={14} className="text-[#C2185B]" />
            <span>معلومات الفرع والتواصل</span>
          </h4>
          
          <div className="space-y-1.5 text-[11px] text-gray-600">
            <p><strong>العنوان:</strong> {salonInfo.address}</p>
            <p><strong>ساعات العمل:</strong> {salonInfo.workingHours}</p>
            <p><strong>خدمة العميلات:</strong> {salonInfo.phone}</p>
          </div>
        </div>

        {/* Action List Settings */}
        <div className="bg-white rounded-[22px] border border-pink-100/90 divide-y divide-pink-50 shadow-xs overflow-hidden">
          <div 
            onClick={onResetData}
            className="p-3 flex items-center justify-between hover:bg-pink-50/50 cursor-pointer active-press"
          >
            <div className="flex items-center gap-2 text-gray-700 text-[11.5px] font-medium">
              <LogOut size={15} className="text-rose-500" />
              <span>إعادة ضبط البيانات التجريبية للمحاكاة</span>
            </div>
            <ChevronLeft size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

