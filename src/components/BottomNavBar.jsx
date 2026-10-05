import React from 'react';
import { Home, Calendar, ShoppingBag, User } from 'lucide-react';

export default function BottomNavBar({ activeTab, setActiveTab, cartItemsCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'appointments', label: 'مواعيدي', icon: Calendar, badge: 1 },
    { id: 'store', label: 'منتجاتنا', icon: ShoppingBag, badge: cartItemsCount > 0 ? cartItemsCount : null },
    { id: 'profile', label: 'ملفي', icon: User },
  ];

  return (
    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-40 pointer-events-none">
      <div className="pointer-events-auto bg-white rounded-[22px] h-[64px] px-2 flex items-center justify-around shadow-[0_10px_40px_rgba(194,24,91,0.25)] relative border border-gray-100/50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center transition-all duration-200 relative select-none active-press ${
                isActive
                  ? 'bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white px-4 py-1.5 rounded-[16px] shadow-[0_4px_12px_rgba(194,24,91,0.3)]'
                  : 'text-[#880E4F]/70 hover:text-[#880E4F] px-2.5 py-1 rounded-[16px]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  size={isActive ? 18 : 19}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-105 stroke-[2.4]' : 'scale-100 stroke-[1.9]'
                  }`}
                />

                {/* Badge indicator */}
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 bg-[#C2185B] text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10.5px] leading-tight mt-0.5 tracking-tight font-medium ${
                  isActive ? 'font-bold text-white' : 'font-semibold text-[#880E4F]/70'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
