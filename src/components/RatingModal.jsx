import React, { useState } from 'react';
import { X, Star, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

export default function RatingModal({ appointment, isOpen, onClose, onRatingSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onRatingSubmitted(appointment.id, rating, comment);
      setSubmitted(false);
      onClose();
    }, 600);
  };

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

        {submitted ? (
          <div className="py-6 space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-scaleUp">
              <CheckCircle2 size={26} />
            </div>
            <h4 className="text-[14px] font-bold text-[#880E4F]">شكراً لتقييمك! 💖</h4>
            <p className="text-[11px] text-gray-500">تمت إضافة 50 نقطة ولاء جديدة لحسابك</p>
          </div>
        ) : (
          <>
            <div className="pt-1">
              <span className="text-[9.5px] font-bold text-[#C2185B] bg-pink-50 px-2 py-0.5 rounded-full inline-block mb-1">
                +50 نقطة ولاء VIP هدية
              </span>
              <h3 className="text-[14px] font-bold text-[#880E4F]">
                كيف كانت تجربتك معنا؟ ✨
              </h3>
              <p className="text-[10.5px] text-gray-500 mt-0.5">{appointment.serviceName}</p>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-115 transition-transform"
                >
                  <Star
                    size={26}
                    className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                  />
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتبي تعليقك أو رأيك بالخدمة (اختياري)..."
              rows={2}
              className="w-full p-2.5 bg-[#FFF0F5]/50 border border-pink-100 rounded-xl text-[11px] text-right focus:outline-none focus:border-[#C2185B]"
            />

            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl text-[11.5px] font-bold shadow-xs active-press"
            >
              إرسال التقييم وكسب النقاط
            </button>
          </>
        )}
      </div>
    </div>
  );
}
