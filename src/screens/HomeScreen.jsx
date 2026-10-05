import React, { useState } from 'react';
import HorizontalSlider from '../components/HorizontalSlider';
import { 
  Bell, Sparkles, Wand2, Star, Clock, 
  ChevronLeft, Lightbulb, ShoppingBag
} from 'lucide-react';
import { 
  offersData, serviceCategories, servicesData, 
  problemsSolutionsData, productsData 
} from '../data/mockData';

export default function HomeScreen({ 
  user, 
  unreadNotifsCount, 
  onOpenNotifications, 
  onBookService, 
  onSelectOffer, 
  onOpenProblemDetail, 
  onOpenProductDetail, 
  onOpenHairstyleAdvisor,
  onAddProductToCart,
  onNavigateToTab
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.categoryId === activeCategory);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الجمال والأناقة';
    if (hour < 17) return 'مساء النضارة والتألق';
    return 'مساء السحر والجمال';
  };

  return (
    <div className="screen-scroll flex-1 min-h-0 text-right bg-[#FFF0F5] select-none">

      {/* ── 1. Top Header ── */}
      <div className="sticky top-0 z-30 bg-[#FFF0F5]/95 backdrop-blur-md px-4 py-2.5 border-b border-pink-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-[#C2185B]/30 shadow-xs" 
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-[14.5px] font-bold text-[#880E4F] leading-none">
                أهلاً، {user.name}
              </h2>
              <span className="text-[9px] bg-[#880E4F] text-amber-300 font-bold px-1.5 py-0.5 rounded-md shadow-2xs">
                VIP
              </span>
            </div>
            <p className="text-[11px] text-[#880E4F]/75 font-medium mt-1">
              {getGreeting()} ✨
            </p>
          </div>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-full bg-white border border-pink-100 shadow-xs flex items-center justify-center text-[#880E4F] hover:bg-pink-50 active-press"
          title="الإشعارات"
        >
          <Bell size={17} />
          {unreadNotifsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#C2185B] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
              {unreadNotifsCount}
            </span>
          )}
        </button>
      </div>

      <div className="px-4 space-y-4 pt-3">
        {/* ── 2. Offers & Bundles Slider ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[13.5px] font-bold text-[#880E4F]">
              عروض وباقات التوفير الحصرية
            </h3>
            <span className="text-[10px] text-[#C2185B] font-bold bg-pink-100/90 px-2 py-0.5 rounded-full">
              خصم حتى 40%
            </span>
          </div>

          {/* Carousel */}
          <HorizontalSlider className="flex gap-3 overflow-x-auto no-scrollbar pb-1 pt-0.5">
            {offersData.map((offer) => (
              <div
                key={offer.id}
                onClick={() => onSelectOffer(offer)}
                className="flex-shrink-0 w-[275px] bg-white rounded-[20px] border border-pink-100 shadow-xs overflow-hidden cursor-pointer active-press hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-28 w-full bg-gray-900">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover opacity-90" 
                  />
                  {/* High contrast gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                  
                  <span className="absolute top-2 right-2 bg-[#C2185B] text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-md">
                    {offer.badge}
                  </span>
                  
                  <div className="absolute bottom-2 right-2.5 left-2.5 text-white">
                    <h4 className="text-[12.5px] font-bold truncate drop-shadow-md text-white">
                      {offer.title}
                    </h4>
                  </div>
                </div>

                <div className="p-3 text-right flex flex-col justify-between flex-1">
                  <p className="text-[10.5px] text-gray-600 line-clamp-2 leading-relaxed min-h-[30px]">
                    {offer.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-pink-50 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[13.5px] font-black text-[#C2185B]">{offer.price} ج.م</span>
                      <span className="text-[10.5px] text-gray-500 line-through font-semibold">{offer.originalPrice} ج.م</span>
                    </div>
                    <button className="px-3 py-1 bg-[#C2185B] hover:bg-[#A01346] text-white rounded-xl text-[10px] font-bold shadow-xs active-press transition-colors whitespace-nowrap">
                      احجزي الباقة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </HorizontalSlider>
        </div>

        {/* ── 3. Book Service CTA Banner ── */}
        <div 
          onClick={() => onBookService(servicesData[0])}
          className="relative h-[115px] rounded-[20px] overflow-hidden shadow-xs border border-pink-100 cursor-pointer active-press group bg-gray-900"
        >
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80" 
            alt="حجز موعد" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
          />
          {/* Deep dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-black/30" />
          
          <div className="absolute inset-0 p-3.5 flex flex-col justify-center items-start text-white">
            <h4 className="text-[14.5px] font-black text-white drop-shadow-md leading-tight">
              جاهزة لإطلالة متألقة؟
            </h4>
            <p className="text-[10.5px] text-pink-100 mt-0.5 drop-shadow-sm font-medium">
              احجزي جلستك القادمة مع أفضل خبيرات التجميل
            </p>
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[#880E4F] rounded-xl text-[10.5px] font-bold shadow-sm">
              <span>احجزي موعدك</span>
              <ChevronLeft size={12} className="text-[#880E4F]" />
            </div>
          </div>
        </div>

        {/* ── 4. Problems & Solutions Section ── */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-pink-100 flex items-center justify-center text-[#880E4F]">
                <Lightbulb size={13} />
              </div>
              <h3 className="text-[13.5px] font-bold text-[#880E4F]">مشاكل وحلول</h3>
              <span className="text-[8.5px] bg-pink-100 text-[#880E4F] font-bold px-1.5 py-0.2 rounded-full">
                دليل الجمال
              </span>
            </div>
            <span className="text-[10.5px] text-[#880E4F] font-bold cursor-pointer hover:underline">
              عرض الكل
            </span>
          </div>
          <p className="text-[10px] text-[#880E4F]/75 font-medium">
            اعثري على التشخيص والحلول المناسبة لشعرك وبشرتك
          </p>

          {/* Horizontal Problem Cards */}
          <HorizontalSlider className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {problemsSolutionsData.map((problem) => (
              <div
                key={problem.id}
                onClick={() => onOpenProblemDetail(problem)}
                className="flex-shrink-0 w-[145px] h-[190px] bg-white rounded-[18px] border border-pink-100 shadow-xs overflow-hidden cursor-pointer active-press hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-[75px] w-full relative bg-pink-50">
                    <img 
                      src={problem.image} 
                      alt={problem.title} 
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-1.5 right-1.5 text-sm drop-shadow-sm bg-white/80 backdrop-blur-xs rounded-full p-0.5">
                      {problem.icon}
                    </span>
                  </div>

                  <div className="p-2">
                    <span className="text-[8px] font-bold text-[#880E4F] bg-pink-50 px-1.5 py-0.5 rounded-md inline-block">
                      {problem.category}
                    </span>
                    <h4 className="text-[11px] font-bold text-[#880E4F] leading-snug line-clamp-2 mt-1 min-h-[30px]">
                      {problem.title}
                    </h4>
                  </div>
                </div>

                <div className="px-2.5 py-1.5 border-t border-pink-50 flex items-center justify-between text-[9.5px] font-bold text-[#C2185B] bg-pink-50/40">
                  <span>التفاصيل والحل</span>
                  <ChevronLeft size={11} className="text-[#C2185B]" />
                </div>
              </div>
            ))}
          </HorizontalSlider>
        </div>

        {/* ── 5. Luxury Brand Highlight Strip ── */}
        <div className="rounded-[18px] bg-gradient-to-r from-[#4A0E2E] via-[#700940] to-[#880E4F] p-3 text-white border border-pink-200/20 shadow-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[15px] flex-shrink-0">✨</span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-white leading-tight truncate">
                خصومات خاصة على جلسات الفيلر والبروتين
              </p>
              <p className="text-[9px] text-pink-200 truncate mt-0.5">
                احصلي على 50 نقطة VIP إضافية عند حجزك عبر التطبيق
              </p>
            </div>
          </div>
          <span className="text-[9px] bg-amber-400 text-[#4A0E2E] font-bold px-2 py-0.5 rounded-lg flex-shrink-0">
            عرض حصري
          </span>
        </div>

        {/* ── 6. AI Hairstyle Advisor Banner ── */}
        <div 
          onClick={onOpenHairstyleAdvisor}
          className="relative rounded-[18px] overflow-hidden shadow-xs p-3 bg-gradient-to-r from-[#5a0c32] via-[#7a0f44] to-[#880E4F] text-white cursor-pointer active-press group border border-pink-200/20"
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="max-w-[75%]">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-[8.5px] font-bold mb-1">
                <Sparkles size={9} />
                <span>ميزة الذكاء الاصطناعي</span>
              </span>
              <h3 className="text-[12.5px] font-bold leading-tight text-white">
                استشيري الذكاء الاصطناعي لقصتك القادمة
              </h3>
              <p className="text-[9.5px] text-pink-100 mt-0.5 line-clamp-1 opacity-90">
                تحليل ملامح الوجه واختيار القصة واللون الأنسب لكِ بدقة
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
              <Wand2 size={18} className="text-amber-300" />
            </div>
          </div>
        </div>

        {/* ── 7. Salon Services List ── */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[13.5px] font-bold text-[#880E4F]">
              خدمات الصالون المميزة
            </h3>
            <span className="text-[10px] text-[#C2185B] font-bold">
              {filteredServices.length} خدمة
            </span>
          </div>

          {/* Categories Horizontal Pills */}
          <HorizontalSlider className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {serviceCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all active-press ${
                    isSelected
                      ? 'bg-[#880E4F] text-white shadow-xs'
                      : 'bg-white text-[#880E4F] border border-pink-100 hover:bg-pink-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </HorizontalSlider>

          {/* Services Vertical List */}
          <div className="space-y-2">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="p-2.5 bg-white rounded-[18px] border border-pink-100 shadow-xs flex items-center gap-2.5 hover:shadow-md transition-all"
              >
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-[62px] h-[62px] rounded-xl object-cover flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] font-bold text-[#880E4F] truncate">{service.name}</h4>
                  <p className="text-[9.5px] text-gray-500 line-clamp-1 mt-0.5">{service.description}</p>
                  
                  <div className="flex items-center gap-2 mt-1 text-[9.5px] text-gray-400">
                    <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                      <Star size={9} fill="#D97706" />
                      <span>{service.rating}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock size={9} />
                      <span>{service.durationMinutes} دقيقة</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-pink-50">
                    <span className="text-[12.5px] font-black text-[#C2185B]">{service.price} ج.م</span>
                    <button
                      onClick={() => onBookService(service)}
                      className="px-2.5 py-1 bg-[#C2185B] hover:bg-[#A01346] text-white rounded-lg text-[10px] font-bold shadow-xs active-press transition-colors"
                    >
                      حجز الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 8. Latest Products Section ── */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[13.5px] font-bold text-[#880E4F]">
              أحدث منتجات العناية
            </h3>
            <button 
              onClick={() => onNavigateToTab('store')}
              className="text-[10px] text-[#880E4F] font-bold hover:underline"
            >
              عرض الكل
            </button>
          </div>

          <HorizontalSlider className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {productsData.slice(0, 4).map((product) => (
              <div
                key={product.id}
                onClick={() => onOpenProductDetail(product)}
                className="flex-shrink-0 w-[140px] h-[185px] bg-white rounded-[18px] border border-pink-100 shadow-xs p-2 overflow-hidden cursor-pointer active-press hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-[85px] w-full rounded-[12px] overflow-hidden bg-pink-50 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                    />
                    {product.badge && (
                      <span className="absolute top-1 right-1 bg-[#C2185B] text-white text-[7.5px] font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-[10.5px] font-bold text-[#880E4F] leading-tight line-clamp-2 mt-1.5">
                    {product.name}
                  </h4>
                </div>

                <div className="mt-1.5 pt-1 border-t border-pink-50 flex items-center justify-between">
                  <span className="text-[11px] font-black text-[#C2185B]">{product.price} ج.م</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddProductToCart(product);
                    }}
                    className="p-1 bg-pink-100 text-[#C2185B] rounded-lg hover:bg-[#C2185B] hover:text-white transition-colors"
                    title="إضافة للسلة"
                  >
                    <ShoppingBag size={12} />
                  </button>
                </div>
              </div>
            ))}
          </HorizontalSlider>
        </div>
      </div>
    </div>
  );
}
