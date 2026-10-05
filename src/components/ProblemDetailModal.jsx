import React from 'react';
import { 
  X, AlertCircle, CheckCircle2, Sparkles, ShoppingBag, 
  Calendar, ChevronLeft, ShieldCheck 
} from 'lucide-react';
import { servicesData, productsData } from '../data/mockData';

export default function ProblemDetailModal({ 
  problem, 
  isOpen, 
  onClose, 
  onBookService, 
  onAddProductToCart 
}) {
  if (!isOpen || !problem) return null;

  const matchedService = servicesData.find(s => s.id === problem.recommendedServiceId) || servicesData[0];
  const matchedProduct = productsData.find(p => p.id === problem.recommendedProductId) || productsData[0];

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center select-none">
      <div 
        className="w-full bg-white rounded-t-[32px] max-h-[88%] overflow-hidden flex flex-col shadow-2xl border-t border-pink-100 animate-slideUp text-right"
      >
        {/* Cover Photo & Header */}
        <div className="relative h-40 w-full flex-shrink-0 bg-pink-100">
          <img 
            src={problem.image} 
            alt={problem.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#880E4F] via-transparent to-black/30" />
          
          <button 
            onClick={onClose}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 active-press"
          >
            <X size={16} />
          </button>

          <div className="absolute bottom-3 right-4 left-4 text-white">
            <span className="text-[9.5px] font-bold bg-[#FFD700] text-[#880E4F] px-2 py-0.5 rounded-full shadow-xs mb-1 inline-block">
              {problem.category}
            </span>
            <h3 className="text-[15px] font-black leading-tight drop-shadow-sm">
              {problem.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto app-scroll p-4 space-y-4">
          {/* Diagnostic & Causes */}
          <div className="bg-[#FFF0F5]/80 p-3.5 rounded-2xl border border-pink-100/90 space-y-1.5">
            <h4 className="text-[12.5px] font-bold text-[#880E4F] flex items-center gap-1.5">
              <AlertCircle size={14} className="text-[#C2185B]" />
              <span>التشخيص والأسباب الشائعة:</span>
            </h4>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              {problem.causes}
            </p>
          </div>

          {/* Solutions & Tips */}
          <div className="space-y-1.5">
            <h4 className="text-[12.5px] font-bold text-[#880E4F] flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>خطوات العلاج والروتين الموصى به:</span>
            </h4>
            <div className="space-y-1.5">
              {problem.solutions.map((sol, i) => (
                <div key={i} className="flex items-start gap-2 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                  <span className="w-4 h-4 rounded-full bg-pink-100 text-[#C2185B] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-[11px] text-gray-700 leading-normal">{sol}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Salon Session */}
          <div className="space-y-2 pt-1 border-t border-pink-50">
            <h4 className="text-[12.5px] font-bold text-[#880E4F] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#FFD700]" />
              <span>جلسة الصالون الأنسب لهذه الحالة:</span>
            </h4>
            <div className="p-3 bg-white rounded-2xl border border-pink-100/90 shadow-xs flex items-center gap-3">
              <img 
                src={matchedService.image} 
                alt={matchedService.name} 
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-2xs" 
              />
              <div className="flex-1 min-w-0">
                <h5 className="text-[12px] font-bold text-[#880E4F] truncate">{matchedService.name}</h5>
                <p className="text-[10px] text-gray-500 line-clamp-1">{matchedService.description}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[12px] font-black text-[#C2185B]">{matchedService.price} ج.م</span>
                  <button
                    onClick={() => {
                      onClose();
                      onBookService(matchedService);
                    }}
                    className="px-2.5 py-1 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl text-[10px] font-bold shadow-xs active-press"
                  >
                    حجز الجلسة
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Home Product */}
          <div className="space-y-2 pt-1">
            <h4 className="text-[12.5px] font-bold text-[#880E4F] flex items-center gap-1.5">
              <ShoppingBag size={14} className="text-[#C2185B]" />
              <span>المنتج المنزلي الداعم:</span>
            </h4>
            <div className="p-3 bg-white rounded-2xl border border-pink-100/90 shadow-xs flex items-center gap-3">
              <img 
                src={matchedProduct.image} 
                alt={matchedProduct.name} 
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-2xs" 
              />
              <div className="flex-1 min-w-0">
                <h5 className="text-[12px] font-bold text-[#880E4F] truncate">{matchedProduct.name}</h5>
                <p className="text-[10px] text-gray-500 line-clamp-1">{matchedProduct.description}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[12px] font-black text-[#C2185B]">{matchedProduct.price} ج.م</span>
                  <button
                    onClick={() => {
                      onAddProductToCart(matchedProduct);
                    }}
                    className="px-2.5 py-1 bg-pink-100 text-[#C2185B] rounded-xl text-[10px] font-bold hover:bg-[#C2185B] hover:text-white transition-colors active-press"
                  >
                    إضافة للسلة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
