import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, 
  Sparkles, CheckCircle, ShieldCheck, Tag, CreditCard, Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  onCheckoutSuccess 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedDiscount > 0 ? (subtotal * appliedDiscount) / 100 : 0;
  const shippingFee = subtotal > 0 ? 30 : 0;
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'vip20' || promoCode.trim() === 'خصم20') {
      setAppliedDiscount(20);
      setPromoSuccess(true);
    } else {
      alert('كود الخصم غير صالح، يمكنك تجربة كود VIP20');
    }
  };

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C2185B', '#880E4F', '#9C27B0', '#FFD700']
        });
      } catch (_) {}

      setTimeout(() => {
        onCheckoutSuccess();
        onClearCart();
        setCheckoutComplete(false);
        onClose();
      }, 1500);
    }, 700);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center select-none">
      <div 
        className="w-full bg-white rounded-t-[32px] max-h-[92%] overflow-hidden flex flex-col shadow-2xl border-t border-pink-100 animate-slideUp text-right"
      >
        {/* Header */}
        <div className="p-4 border-b border-pink-50 flex items-center justify-between bg-[#FFF0F5]/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <ShoppingBag size={15} />
            </div>
            <div>
              <h3 className="text-[13.5px] font-bold text-[#880E4F] leading-tight">سلة المشتريات</h3>
              <p className="text-[10px] text-gray-500">{cartItems.length} منتجات مضافة</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-pink-100 flex items-center justify-center text-gray-400 hover:text-gray-600 active-press"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto app-scroll p-4 space-y-4">
          {checkoutComplete ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-scaleUp">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-[16px] font-bold text-[#880E4F]">تم تأكيد طلبك بنجاح! 🛍️</h4>
              <p className="text-[11.5px] text-gray-600 leading-relaxed max-w-xs mx-auto">
                جاري تجهيز منتجات العناية وتغليفها وستصلك خلال 24 ساعة مع مندوب الصالون.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <ShoppingBag size={40} className="text-gray-300 mx-auto" />
              <h4 className="text-[13px] font-bold text-[#880E4F]">سلة المشتريات فارغة</h4>
              <p className="text-[11px] text-gray-400">تصفحي متجر منتجات العناية وأضيفي ما يناسبك</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="p-2.5 bg-[#FFF0F5]/40 rounded-2xl border border-pink-100/80 flex items-center gap-3"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-2xs" 
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[11.5px] font-bold text-[#880E4F] truncate">{item.name}</h5>
                      <span className="text-[11.5px] font-black text-[#C2185B] block mt-0.5">
                        {item.price * item.quantity} ج.م
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-pink-100 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 active-press"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-[11px] font-bold px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 active-press"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-rose-500 p-1 hover:bg-rose-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code input */}
              <div className="bg-[#FFF0F5]/60 p-3 rounded-2xl border border-pink-100 space-y-2">
                <span className="text-[11px] font-bold text-[#880E4F] flex items-center gap-1">
                  <Tag size={12} className="text-[#C2185B]" />
                  <span>كود الخصم (جربي VIP20):</span>
                </span>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="ادخلي كود الخصم"
                    className="flex-1 px-3 py-1.5 bg-white border border-pink-100 rounded-xl text-[11px] text-right focus:outline-none focus:border-[#C2185B]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl text-[10.5px] font-bold shadow-xs active-press"
                  >
                    تطبيق
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[10px] text-emerald-600 font-bold">تم تطبيق خصم 20% بنجاح! ✨</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white p-3 rounded-2xl border border-pink-100 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-gray-500">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-gray-800">{subtotal} ج.م</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>الخصم (20%):</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>رسوم التوصيل:</span>
                  <span className="font-bold text-gray-800">{shippingFee} ج.م</span>
                </div>
                <div className="pt-2 border-t border-pink-100 flex justify-between text-[13px] font-black text-[#C2185B]">
                  <span>الإجمالي النهائي:</span>
                  <span>{finalTotal} ج.م</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!checkoutComplete && cartItems.length > 0 && (
          <div className="p-3.5 border-t border-pink-50 bg-[#FFF0F5]/50">
            <button
              onClick={handleCompleteOrder}
              disabled={isCheckingOut}
              className="w-full py-2.5 bg-gradient-to-r from-[#FFD700] via-[#F7941D] to-[#C2185B] text-white rounded-xl font-bold text-[12px] shadow-xs flex items-center justify-center gap-1.5 active-press disabled:opacity-75"
            >
              {isCheckingOut ? (
                <span>جاري إتمام الطلب...</span>
              ) : (
                <>
                  <span>إتمام الطلب والدفع ({finalTotal} ج.م)</span>
                  <Sparkles size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
