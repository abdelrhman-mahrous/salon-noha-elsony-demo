import React, { useState } from 'react';
import { 
  X, Calendar, Clock, User, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck, CreditCard, Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { specialistsData } from '../data/mockData';

export default function BookingModal({ service, offer, isOpen, onClose, onBookingSuccess }) {
  const [step, setStep] = useState(1); // 1: Specialist & Addons, 2: Date & Time, 3: Confirmation
  const [selectedSpecialist, setSelectedSpecialist] = useState(specialistsData[0]);
  const [selectedDate, setSelectedDate] = useState('غداً (السبت 4 أكتوبر)');
  const [selectedTime, setSelectedTime] = useState('05:30 مساءً');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const itemTitle = service ? service.name : offer ? offer.title : 'حجز خدمة صالون';
  const basePrice = service ? service.price : offer ? offer.price : 250;
  const duration = service ? `${service.durationMinutes} دقيقة` : offer ? offer.duration : '45 دقيقة';

  const addonsList = [
    { id: 'add_1', name: 'مساج استرخائي لفروة الرأس وزيت الأرجان', price: 60 },
    { id: 'add_2', name: 'قناع كولاجين للترطيب الفائق للأطراف', price: 80 },
    { id: 'add_3', name: 'سيروم حماية مكثفة من أشعة الشمس والحرارة', price: 45 },
  ];

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = basePrice + addonsTotal;

  const datesList = [
    { label: 'اليوم (الجمعة 3 أكتوبر)', available: true },
    { label: 'غداً (السبت 4 أكتوبر)', available: true },
    { label: 'الأحد 5 أكتوبر', available: true },
    { label: 'الإثنين 6 أكتوبر', available: true },
    { label: 'الثلاثاء 7 أكتوبر', available: true },
  ];

  const timeSlots = [
    { time: '11:00 صباحاً', period: 'صباحي' },
    { time: '01:30 ظهراً', period: 'ظهيرة' },
    { time: '03:30 عصراً', period: 'مسائي' },
    { time: '05:30 مساءً', period: 'مسائي' },
    { time: '07:00 مساءً', period: 'مسائي' },
    { time: '08:45 مساءً', period: 'مسائي' },
  ];

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C2185B', '#880E4F', '#9C27B0', '#FFD700']
        });
      } catch (_) {}

      const newAppointment = {
        id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceName: itemTitle,
        specialistName: selectedSpecialist ? selectedSpecialist.name : 'أ/ نادية محمود',
        date: selectedDate,
        time: selectedTime,
        duration: duration,
        status: 'مؤكد',
        statusCode: 'confirmed',
        price: totalPrice,
        branch: 'فرع مصر الجديدة - شارع الثورة',
        isRated: false,
      };

      onBookingSuccess(newAppointment);
      setStep(4);
    }, 600);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center select-none">
      <div 
        className="w-full bg-white rounded-t-[32px] max-h-[90%] overflow-hidden flex flex-col shadow-2xl border-t border-pink-100 animate-slideUp text-right"
      >
        {/* Header */}
        <div className="p-4 border-b border-pink-50 flex items-center justify-between bg-[#FFF0F5]/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {step <= 3 ? step : '✓'}
            </div>
            <div>
              <h3 className="text-[13.5px] font-bold text-[#880E4F] leading-tight">
                {step === 1 && 'اختيار الخبيرة والإضافات'}
                {step === 2 && 'تحديد الموعد والتوقيت'}
                {step === 3 && 'مراجعة وتأكيد الحجز'}
                {step === 4 && 'تم تأكيد الحجز بنجاح 🎉'}
              </h3>
              <p className="text-[10.5px] text-gray-500">{itemTitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-pink-100 flex items-center justify-center text-gray-400 hover:text-gray-600 active-press"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto app-scroll p-4 space-y-4">
          {/* STEP 1: Specialist & Addons */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-[12.5px] font-bold text-[#880E4F] mb-2">
                  اختاري خبيرة التجميل المفضلة:
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {specialistsData.map((spec) => {
                    const isSelected = selectedSpecialist?.id === spec.id;
                    return (
                      <div
                        key={spec.id}
                        onClick={() => setSelectedSpecialist(spec)}
                        className={`p-2.5 rounded-2xl border text-right cursor-pointer transition-all active-press relative ${
                          isSelected 
                            ? 'border-[#C2185B] bg-pink-50/70 shadow-xs ring-1 ring-[#C2185B]' 
                            : 'border-pink-100 bg-white hover:border-pink-200'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2 left-2 w-4 h-4 bg-[#C2185B] text-white rounded-full flex items-center justify-center text-[9px]">
                            ✓
                          </span>
                        )}
                        <img 
                          src={spec.avatar} 
                          alt={spec.name} 
                          className="w-11 h-11 rounded-full object-cover border border-pink-100 mb-1.5" 
                        />
                        <h5 className="text-[11.5px] font-bold text-[#880E4F] truncate">{spec.name}</h5>
                        <p className="text-[9.5px] text-gray-500 truncate">{spec.role}</p>
                        <div className="flex items-center gap-1 mt-1 text-[9.5px] text-amber-600 font-bold">
                          <span>★ {spec.rating}</span>
                          <span className="text-gray-400">({spec.reviewsCount})</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Addons Selection */}
              <div>
                <h4 className="text-[12.5px] font-bold text-[#880E4F] mb-2">
                  خدمات إضافية مقترحة (اختياري):
                </h4>
                <div className="space-y-2">
                  {addonsList.map((addon) => {
                    const isSelected = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all active-press ${
                          isSelected 
                            ? 'border-[#C2185B] bg-pink-50/70 text-[#880E4F]' 
                            : 'border-pink-100 bg-white text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                            isSelected ? 'bg-[#C2185B] text-white border-[#C2185B]' : 'border-gray-300'
                          }`}>
                            {isSelected && '✓'}
                          </div>
                          <span className="text-[11px] font-medium">{addon.name}</span>
                        </div>
                        <span className="text-[11.5px] font-bold text-[#C2185B]">+{addon.price} ج.م</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-[12.5px] font-bold text-[#880E4F] mb-2 flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#C2185B]" />
                  <span>اختاري يوم الزيارة:</span>
                </h4>
                <div className="space-y-1.5">
                  {datesList.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d.label)}
                      className={`w-full py-2.5 px-3 rounded-xl border text-[11.5px] text-right flex items-center justify-between transition-all active-press ${
                        selectedDate === d.label 
                          ? 'bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white border-transparent shadow-xs font-bold' 
                          : 'bg-white border-pink-100 text-gray-700 hover:border-pink-200'
                      }`}
                    >
                      <span>{d.label}</span>
                      <span className="text-[10px] opacity-80">متاح 8 مواعيد</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[12.5px] font-bold text-[#880E4F] mb-2 flex items-center gap-1.5">
                  <Clock size={13} className="text-[#C2185B]" />
                  <span>الوقت المناسب:</span>
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-1 rounded-xl border text-[11px] text-center transition-all active-press ${
                        selectedTime === slot.time 
                          ? 'bg-[#880E4F] text-white border-[#880E4F] font-bold shadow-xs' 
                          : 'bg-white border-pink-100 text-gray-700 hover:border-pink-200'
                      }`}
                    >
                      <div className="font-bold">{slot.time}</div>
                      <div className="text-[9px] opacity-70 mt-0.5">{slot.period}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Summary & Payment */}
          {step === 3 && (
            <div className="space-y-3.5">
              <div className="bg-[#FFF0F5]/80 p-3.5 rounded-2xl border border-pink-100/80 space-y-2 text-[11.5px]">
                <div className="flex justify-between">
                  <span className="text-gray-500">الخدمة:</span>
                  <span className="font-bold text-[#880E4F]">{itemTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">الخبيرة:</span>
                  <span className="font-bold text-[#880E4F]">{selectedSpecialist?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">الموعد:</span>
                  <span className="font-bold text-[#880E4F]">{selectedDate} - {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">المدة التقريبية:</span>
                  <span className="font-medium text-gray-700">{duration}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="pt-2 border-t border-pink-100 flex justify-between text-[11px]">
                    <span className="text-gray-500">الإضافات:</span>
                    <span className="text-[#C2185B] font-bold">+{addonsTotal} ج.م ({selectedAddons.length})</span>
                  </div>
                )}
                <div className="pt-2 border-t border-pink-100 flex justify-between text-[13px] font-black text-[#C2185B]">
                  <span>المبلغ الإجمالي:</span>
                  <span>{totalPrice} ج.م</span>
                </div>
              </div>

              <div>
                <h4 className="text-[12.5px] font-bold text-[#880E4F] mb-2">طريقة الدفع:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2.5 rounded-xl border text-[11px] text-center flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'cash' 
                        ? 'border-[#C2185B] bg-pink-50/70 text-[#880E4F] font-bold' 
                        : 'border-pink-100 bg-white text-gray-600'
                    }`}
                  >
                    <Banknote size={14} />
                    <span>الدفع في الصالون</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-[11px] text-center flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-[#C2185B] bg-pink-50/70 text-[#880E4F] font-bold' 
                        : 'border-pink-100 bg-white text-gray-600'
                    }`}
                  >
                    <CreditCard size={14} />
                    <span>بطاقة بنكية / فيزا</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && (
            <div className="py-6 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-scaleUp">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-[16px] font-bold text-[#880E4F]">
                تم تأكيد موعدك بنجاح! ✨
              </h3>
              <p className="text-[11.5px] text-gray-600 max-w-xs mx-auto leading-relaxed">
                سعداء بخدمتك. يمكنك متابعة حجزك وتفاصيله من شاشة "مواعيدي" وإبراز باركود الدخول السريع عند الحضور.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl font-bold text-[12px] shadow-xs active-press mt-2"
              >
                العودة للرئيسية
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 4 && (
          <div className="p-3.5 border-t border-pink-50 bg-[#FFF0F5]/50 flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="py-2.5 px-4 bg-white border border-pink-200 text-[#880E4F] rounded-xl font-bold text-[11.5px] active-press"
              >
                السابق
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl font-bold text-[12px] shadow-xs flex items-center justify-center gap-1 active-press"
              >
                <span>متابعة</span>
                <ChevronLeft size={14} />
              </button>
            ) : (
              <button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#FFD700] via-[#F7941D] to-[#C2185B] text-white rounded-xl font-bold text-[12px] shadow-xs flex items-center justify-center gap-1 active-press disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>جاري التأكيد...</span>
                ) : (
                  <>
                    <span>تأكيد الحجز النهائي ({totalPrice} ج.م)</span>
                    <Sparkles size={14} />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
