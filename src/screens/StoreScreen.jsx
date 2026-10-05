import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Star, Filter, Plus, Heart, 
  Check, Sparkles, AlertCircle 
} from 'lucide-react';
import { productsData, productCategories } from '../data/mockData';

export default function StoreScreen({ 
  onOpenProductDetail, 
  onAddProductToCart, 
  onOpenCart, 
  cartItemsCount = 0 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = product.name.includes(searchQuery) || product.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="screen-scroll flex-1 min-h-0 text-right bg-[#FFF0F5] select-none">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#FFF0F5]/95 backdrop-blur-md px-4 pt-2.5 pb-2.5 border-b border-pink-100/70 flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#880E4F]">متجر منتجات العناية 🛍️</h2>
          <p className="text-[11px] text-[#880E4F]/70">أفضل منتجات الشعر والبشرة الأصلية</p>
        </div>
        
        {/* Cart Drawer Trigger */}
        <button
          onClick={onOpenCart}
          className="relative w-10 h-10 rounded-full bg-white border border-[#C2185B]/20 shadow-xs flex items-center justify-center text-[#880E4F] hover:bg-pink-50/50 active-press"
          title="سلة المشتريات"
        >
          <ShoppingBag size={18} />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-sm">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="px-4 pt-4 space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحثي عن شامبو، سيروم، ماسك..."
            className="w-full py-2 px-3.5 pr-9 bg-white border border-pink-100/90 rounded-2xl text-[12px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C2185B] shadow-2xs text-right"
          />
          <Search size={15} className="absolute top-2.5 right-3 text-gray-400" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {productCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-xl text-[10.5px] font-bold flex items-center gap-1 transition-all active-press ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white shadow-xs'
                    : 'bg-white text-[#880E4F] border border-pink-100/80 hover:bg-pink-50/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pt-3.5 pb-2">
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-[24px] border border-pink-100 p-5 space-y-2.5 shadow-sm">
            <ShoppingBag size={24} className="text-gray-300 mx-auto" />
            <h4 className="text-[13px] font-bold text-[#880E4F]">لا توجد نتائج مطابقة</h4>
            <p className="text-[11px] text-gray-400">جربي البحث بكلمات أخرى أو تغيير القسم</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onOpenProductDetail(product)}
                className="bg-white rounded-[20px] border border-pink-100/80 shadow-sm p-2.5 overflow-hidden cursor-pointer active-press hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-[110px] w-full rounded-[14px] overflow-hidden bg-pink-50 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                    />
                    {product.badge && (
                      <span className="absolute top-1.5 right-1.5 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 space-y-0.5">
                    <div className="flex items-center gap-1 text-[9px] text-amber-600 font-bold">
                      <Star size={9} fill="#D97706" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400">({product.reviewsCount})</span>
                    </div>

                    <h4 className="text-[11.5px] font-bold text-[#880E4F] leading-tight line-clamp-2">
                      {product.name}
                    </h4>
                    
                    <p className="text-[9.5px] text-gray-400 line-clamp-1">{product.size}</p>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-pink-50 flex items-center justify-between">
                  <div>
                    <span className="text-[12.5px] font-black text-[#C2185B]">{product.price} ج.م</span>
                    {product.originalPrice && (
                      <span className="text-[9px] text-gray-400 line-through mr-1 block">
                        {product.originalPrice} ج.م
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddProductToCart(product);
                    }}
                    className="p-1.5 bg-pink-100 text-[#C2185B] rounded-xl hover:bg-[#C2185B] hover:text-white transition-colors active-press"
                    title="إضافة للسلة"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

