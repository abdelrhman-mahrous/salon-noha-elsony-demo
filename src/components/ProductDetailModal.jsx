import React, { useState } from 'react';
import { 
  X, Star, ShoppingBag, ShieldCheck, Heart, 
  Sparkles, Check, ChevronLeft, Award 
} from 'lucide-react';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 400);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center select-none">
      <div 
        className="w-full bg-white rounded-t-[32px] max-h-[88%] overflow-hidden flex flex-col shadow-2xl border-t border-pink-100 animate-slideUp text-right"
      >
        {/* Image & Header */}
        <div className="relative h-48 w-full flex-shrink-0 bg-pink-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          <button 
            onClick={onClose}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 active-press"
          >
            <X size={16} />
          </button>

          {product.badge && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}

          <div className="absolute bottom-3 right-4 left-4 text-white">
            <h3 className="text-[15px] font-black leading-tight drop-shadow-sm">
              {product.name}
            </h3>
            <p className="text-[10.5px] text-pink-100 mt-0.5">{product.size}</p>
          </div>
        </div>

        {/* Details Body */}
        <div className="flex-1 overflow-y-auto app-scroll p-4 space-y-3.5">
          {/* Rating & Price Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-pink-50">
            <div>
              <span className="text-[17px] font-black text-[#C2185B]">{product.price} ج.م</span>
              {product.originalPrice && (
                <span className="text-[11px] text-gray-400 line-through mr-1.5">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-100">
              <Star size={12} fill="#D97706" />
              <span>{product.rating}</span>
              <span className="text-gray-400">({product.reviewsCount} تقييم)</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-[12px] font-bold text-[#880E4F]">تفاصيل المنتج والمكونات:</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Guarantee Badges */}
          <div className="bg-[#FFF0F5]/80 p-3 rounded-2xl border border-pink-100 space-y-1.5">
            <div className="flex items-center gap-2 text-[10.5px] text-gray-700">
              <ShieldCheck size={14} className="text-[#C2185B]" />
              <span>منتج أصلي 100% ومضمون من الوكيل المعتمد</span>
            </div>
            <div className="flex items-center gap-2 text-[10.5px] text-gray-700">
              <Sparkles size={14} className="text-[#FFD700]" />
              <span>نتائج ملحوظة من أول أسبوعين من الاستخدام المنتظم</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-pink-50 bg-[#FFF0F5]/50 flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex-1 py-2.5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl font-bold text-[12px] shadow-xs flex items-center justify-center gap-1.5 active-press"
          >
            <ShoppingBag size={15} />
            <span>إضافة إلى سلة المشتريات ({product.price * quantity} ج.م)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
