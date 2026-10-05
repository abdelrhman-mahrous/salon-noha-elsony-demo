import React, { useState } from 'react';
import { 
  Calendar, Clock, User, QrCode, Star, AlertCircle, CheckCircle2, ChevronRight, 
  MapPin, Plus, Sparkles, XCircle
} from 'lucide-react';

export default function AppointmentsScreen({ 
  appointments, 
  onOpenQrCode, 
  onOpenRating, 
  onCancelAppointment, 
  onBookNewService 
}) {
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' | 'completed'

  const upcomingList = appointments.filter(a => a.statusCode === 'confirmed');
  const pastList = appointments.filter(a => a.statusCode === 'completed' || a.statusCode === 'cancelled');

  const displayedList = filter === 'upcoming' ? upcomingList : pastList;

  return (
    <div className="screen-scroll flex-1 min-h-0 text-right bg-[#FFF0F5] select-none">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#FFF0F5]/95 backdrop-blur-md px-4 pt-2.5 pb-2.5 border-b border-pink-100/70 flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#880E4F]">مواعيدي وحجوزاتي 📅</h2>
          <p className="text-[11px] text-[#880E4F]/70">إدارة ومتابعة حجوزاتك بالصالون</p>
        </div>
        <button
          onClick={onBookNewService}
          className="px-3 py-1.5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl text-[10.5px] font-bold shadow-xs flex items-center gap-1 active-press"
        >
          <Plus size={13} />
          <span>حجز جديد</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pt-4">
        <div className="bg-white/80 border border-pink-100/80 p-1 rounded-2xl flex gap-1 shadow-sm">
          <button
            onClick={() => setFilter('upcoming')}
            className={`flex-1 py-1.5 rounded-xl text-[11.5px] font-bold transition-all ${
              filter === 'upcoming'
                ? 'bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white shadow-xs'
                : 'text-[#880E4F]/70 hover:text-[#880E4F]'
            }`}
          >
            المواعيد القادمة ({upcomingList.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-1.5 rounded-xl text-[11.5px] font-bold transition-all ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white shadow-xs'
                : 'text-[#880E4F]/70 hover:text-[#880E4F]'
            }`}
          >
            المواعيد السابقة ({pastList.length})
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="px-4 pt-4 space-y-3.5">
        {displayedList.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-[24px] border border-pink-100 p-5 space-y-2.5 shadow-xs">
            <div className="w-12 h-12 bg-pink-100 text-[#C2185B] rounded-full flex items-center justify-center mx-auto">
              <Calendar size={22} />
            </div>
            <h4 className="text-[13px] font-bold text-[#880E4F]">
              {filter === 'upcoming' ? 'لا توجد مواعيد قادمة حالياً' : 'لا توجد مواعيد سابقة'}
            </h4>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
              احجزي جلستك القادمة للعناية بالشعر أو البشرة مع أفضل خبيرات التجميل.
            </p>
            {filter === 'upcoming' && (
              <button
                onClick={onBookNewService}
                className="py-2 px-5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl text-[11px] font-bold shadow-xs active-press"
              >
                استعراض الخدمات وحجز موعد
              </button>
            )}
          </div>
        ) : (
          displayedList.map((apt) => {
            const isConfirmed = apt.statusCode === 'confirmed';
            return (
              <div
                key={apt.id}
                className="bg-white rounded-[22px] border border-pink-100/90 shadow-xs p-3.5 space-y-2.5 relative overflow-hidden"
              >
                {/* Status Indicator Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  isConfirmed ? 'bg-gradient-to-r from-[#C2185B] to-[#FFD700]' : 'bg-emerald-500'
                }`} />

                {/* Top Row: Service & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9.5px] font-mono font-bold text-gray-400 block mb-0.5">
                      كود الحجز: {apt.id}
                    </span>
                    <h4 className="text-[13px] font-bold text-[#880E4F] leading-snug">
                      {apt.serviceName}
                    </h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold flex-shrink-0 ${
                    isConfirmed 
                      ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                {/* Details Card */}
                <div className="bg-[#FFF0F5]/60 p-2.5 rounded-xl space-y-1 text-[11px] text-gray-700">
                  <div className="flex items-center gap-1.5">
                    <User size={12} className="text-[#C2185B]" />
                    <span>الخبيرة: <strong className="text-[#880E4F]">{apt.specialistName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#880E4F]" />
                    <span>الموعد: <strong>{apt.date} - {apt.time}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[#F7941D]" />
                    <span>المدة: {apt.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-gray-400" />
                    <span>{apt.branch}</span>
                  </div>
                </div>

                {/* Pricing and Action Buttons */}
                <div className="pt-2 border-t border-pink-50 flex items-center justify-between">
                  <div>
                    <span className="text-[9.5px] text-gray-400 block">الإجمالي</span>
                    <span className="text-[13px] font-black text-[#C2185B]">{apt.price} ج.م</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isConfirmed ? (
                      <>
                        <button
                          onClick={() => onOpenQrCode(apt)}
                          className="px-2.5 py-1.5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl text-[10.5px] font-bold shadow-xs flex items-center gap-1 active-press"
                          title="عرض باركود الدخول السريع"
                        >
                          <QrCode size={13} />
                          <span>باركود QR</span>
                        </button>
                        <button
                          onClick={() => onCancelAppointment(apt.id)}
                          className="px-2 py-1.5 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-bold hover:bg-rose-100 transition-colors active-press"
                        >
                          إلغاء
                        </button>
                      </>
                    ) : (
                      !apt.isRated && (
                        <button
                          onClick={() => onOpenRating(apt)}
                          className="px-3 py-1.5 bg-gradient-to-r from-[#FFD700] to-[#F7941D] text-[#880E4F] rounded-xl text-[10.5px] font-bold shadow-xs flex items-center gap-1 active-press"
                        >
                          <Star size={13} fill="#880E4F" />
                          <span>تقييم الخدمة</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

