import React, { useState, useEffect, useRef } from 'react';
import { 
  Wifi, Battery, Signal, Sparkles, ZoomIn, ZoomOut, 
  RotateCcw, CheckCircle, Smartphone
} from 'lucide-react';
import DynamicIsland from './DynamicIsland';
import NotificationBanner from './NotificationBanner';
import BottomNavBar from './BottomNavBar';

// iPhone frame fixed dimensions
const PHONE_W = 390;
const PHONE_H = 844;

export default function IphoneFrame({ 
  children, 
  activeNotification, 
  onCloseNotification, 
  onNotificationClick,
  onTriggerCustomNotification,
  dynamicIslandEvent,
  activeTab,
  setActiveTab,
  cartItemsCount = 0
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [deviceColor, setDeviceColor] = useState('titanium');
  const [manualZoomOffset, setManualZoomOffset] = useState(0); // user-controlled offset
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [autoScale, setAutoScale] = useState(1);
  const containerRef = useRef(null);

  // Auto-scale: fit phone width into the available container width with some padding
  useEffect(() => {
    const calcScale = () => {
      const vw = window.innerWidth;
      // On large screens (>=1024), we share space with the side panel (~320px + gaps)
      // On small/medium screens, the phone takes the full width minus padding
      const availableWidth = vw >= 1024
        ? Math.min(vw * 0.52, 480)   // up to 52% of viewport beside the panel
        : vw - 32;                    // full width minus 16px padding each side

      const scale = Math.min(1, availableWidth / PHONE_W);
      setAutoScale(parseFloat(scale.toFixed(3)));
    };
    calcScale();
    window.addEventListener('resize', calcScale);
    return () => window.removeEventListener('resize', calcScale);
  }, []);

  // Final zoom = autoScale clamped by manual offset
  const zoomLevel = Math.max(0.5, Math.min(1.1, autoScale + manualZoomOffset));

  // The container must reserve the visual height so siblings don't overlap
  const phoneVisualHeight = PHONE_H * zoomLevel;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formatted = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}`;
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const colorThemes = {
    titanium: {
      name: 'تيتانيوم طبيعي',
      borderClass: 'border-[#5a5753] bg-[#2a2927]',
      outerShadow: '0 25px 60px -15px rgba(0,0,0,0.85), 0 0 60px rgba(194,24,91,0.2)',
      buttonClass: 'bg-[#5a5753]',
    },
    desert: {
      name: 'تيتانيوم صحراوي ذهبي',
      borderClass: 'border-[#cbb396] bg-[#3d3328]',
      outerShadow: '0 25px 60px -15px rgba(0,0,0,0.85), 0 0 60px rgba(247,148,29,0.25)',
      buttonClass: 'bg-[#cbb396]',
    },
    black: {
      name: 'تيتانيوم أسود فلكي',
      borderClass: 'border-[#333336] bg-[#17171a]',
      outerShadow: '0 25px 60px -15px rgba(0,0,0,0.95), 0 0 60px rgba(136,14,79,0.3)',
      buttonClass: 'bg-[#333336]',
    },
    silver: {
      name: 'تيتانيوم أبيض ناصع',
      borderClass: 'border-[#e2e4e8] bg-[#4b5563]',
      outerShadow: '0 25px 60px -15px rgba(0,0,0,0.85), 0 0 60px rgba(255,255,255,0.15)',
      buttonClass: 'bg-[#e2e4e8]',
    },
  };

  const currentTheme = colorThemes[deviceColor];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 60% 30%, #24132b 0%, #150a1c 50%, #0a040e 100%)',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C2185B]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#880E4F]/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FFD700]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ══════════════════ MAIN LAYOUT GRID ══════════════════ */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          padding: '24px 16px 40px',
          position: 'relative',
          zIndex: 10,
        }}
        className="lg-row-layout"
      >

        {/* ══════════════════ CENTER IPHONE 16 PRO FRAME ══════════════════ */}
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            // Reserve exactly the visual height so nothing overlaps below
            height: `${phoneVisualHeight}px`,
            overflow: 'visible',
          }}
        >
          {/* Zoom wrapper – isolated so it doesn't affect document flow */}
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              transition: 'transform 0.3s ease',
              width: `${PHONE_W}px`,
              height: `${PHONE_H}px`,
              flexShrink: 0,
            }}
          >
            {/* Outer Phone Hardware Body */}
            <div
              className={`relative rounded-[56px] p-[10px] border-[4.5px] transition-all duration-500 ${currentTheme.borderClass}`}
              style={{
                width: '390px',
                height: '844px',
                boxShadow: currentTheme.outerShadow,
              }}
            >
              {/* Hardware buttons on sides */}
              <div className={`absolute -left-[8px] top-[120px] w-[4.5px] h-[26px] rounded-l-md ${currentTheme.buttonClass}`} />
              <div className={`absolute -left-[8px] top-[165px] w-[4.5px] h-[52px] rounded-l-md ${currentTheme.buttonClass}`} />
              <div className={`absolute -left-[8px] top-[230px] w-[4.5px] h-[52px] rounded-l-md ${currentTheme.buttonClass}`} />
              <div className={`absolute -right-[8px] top-[175px] w-[4.5px] h-[78px] rounded-r-md ${currentTheme.buttonClass}`} />
              {/* Inner Screen Display (Bezel) */}
              <div className="w-full h-full bg-[#FFF0F5] rounded-[46px] overflow-hidden relative flex flex-col shadow-inner select-none border border-black/30">
                
                {/* Top iOS Status Bar Header (Fixed Non-Overlapping Area: 54px) */}
                <div className="w-full h-[54px] pt-3 px-6 flex items-center justify-between z-50 bg-[#FFF0F5] flex-shrink-0 relative border-b border-pink-100/40 shadow-sm">
                  {/* Left: Time */}
                  <span className="text-[13px] font-bold text-[#880E4F] font-mono select-none">
                    {currentTime || '9:41'}
                  </span>
                  
                  {/* Center: Dynamic Island Hardware Pill */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                    <DynamicIsland
                      activeEvent={dynamicIslandEvent}
                      isExpanded={islandExpanded}
                      onExpandToggle={() => setIslandExpanded(!islandExpanded)}
                    />
                  </div>

                  {/* Right: Cellular / Wifi / Battery */}
                  <div className="flex items-center gap-1.5 text-[#880E4F]">
                    <span className="text-[9px] font-bold font-mono">5G</span>
                    <Signal size={12} strokeWidth={2.5} />
                    <Wifi size={12} strokeWidth={2.5} />
                    <div className="flex items-center gap-0.5">
                      <span className="text-[9.5px] font-bold font-mono">98%</span>
                      <Battery size={14} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Push Notification Banner Simulator */}
                <NotificationBanner
                  notification={activeNotification}
                  onClose={onCloseNotification}
                  onClick={onNotificationClick}
                />

                {/* Main App Content View Container (Takes remaining height cleanly) */}
                <div className="flex flex-col w-full flex-1 min-h-0 relative bg-[#FFF0F5] overflow-hidden">
                  {children}
                  <BottomNavBar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    cartItemsCount={cartItemsCount}
                  />
                </div>

                {/* iOS Home Indicator Bar (Fixed at bottom) */}
                <div className="w-full h-[18px] bg-[#FFF0F5] flex items-center justify-center flex-shrink-0 pointer-events-none z-50">
                  <div className="w-32 h-1 bg-[#880E4F]/25 rounded-full" />
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* ══════════════════ CONTROL DECK (below phone on all screens) ══════════════════ */}
        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            direction: 'rtl',
          }}
        >
          {/* Salon Branding Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 text-white shadow-2xl" style={{ padding: '18px' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '10px' }}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FFD700] via-[#C2185B] to-[#880E4F] flex items-center justify-center text-xl shadow-lg border border-white/20" style={{ flexShrink: 0 }}>
                💇‍♀️
              </div>
              <div>
                <h1 className="text-[17px] font-black leading-tight text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  صالون نهى السني
                </h1>
                <p className="text-[11px] text-pink-200 font-semibold">
                  العرض التفاعلي الحي لنسخة العميلات ✨
                </p>
              </div>
            </div>
            <p className="text-[11.5px] text-gray-200 leading-relaxed">
              محاكاة دقيقة مطابقة تماماً لتطبيق الجوال، بنفس الألوان والهوية والمارجينز والانتقالات السلسة وتجربة حجز المواعيد والإشعارات الحية.
            </p>
          </div>

          {/* Live Notification Trigger Simulation */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 text-white shadow-xl" style={{ padding: '16px' }}>
            <div style={{ marginBottom: '10px' }}>
              <span className="text-[12px] font-bold text-amber-300 flex items-center gap-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                <Sparkles size={14} />
                <span>محاكاة إرسال إشعار فوري للعميلة</span>
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => onTriggerCustomNotification('appointment')}
                className="w-full bg-white/10 hover:bg-white/20 rounded-xl text-[11.5px] font-semibold flex items-center justify-between transition-colors active-press"
                style={{ padding: '8px 12px', textAlign: 'right' }}
              >
                <span>📅 إشعار تأكيد موعد بالصالون</span>
                <span className="text-[10px] text-emerald-300 font-mono">تجربة</span>
              </button>
              <button
                onClick={() => onTriggerCustomNotification('offer')}
                className="w-full bg-white/10 hover:bg-white/20 rounded-xl text-[11.5px] font-semibold flex items-center justify-between transition-colors active-press"
                style={{ padding: '8px 12px', textAlign: 'right' }}
              >
                <span>🌸 إشعار خصم 35% لنهاية الأسبوع</span>
                <span className="text-[10px] text-pink-300 font-mono">تجربة</span>
              </button>
              <button
                onClick={() => onTriggerCustomNotification('points')}
                className="w-full bg-white/10 hover:bg-white/20 rounded-xl text-[11.5px] font-semibold flex items-center justify-between transition-colors active-press"
                style={{ padding: '8px 12px', textAlign: 'right' }}
              >
                <span>🎁 إشعار إضافة 100 نقطة ولاء VIP</span>
                <span className="text-[10px] text-amber-300 font-mono">تجربة</span>
              </button>
            </div>
          </div>

          {/* Device Color Picker & Scale */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 text-white shadow-xl" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="text-[12px] font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>هيكل الأيفون:</span>
              <span className="text-[10.5px] text-gray-300 font-medium">{currentTheme.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '12px' }}>
              {[
                { id: 'titanium', color: '#8a8580', label: 'تيتانيوم' },
                { id: 'desert', color: '#d4a87a', label: 'صحراوي' },
                { id: 'black', color: '#2b2b2b', label: 'أسود' },
                { id: 'silver', color: '#e5e7eb', label: 'فضي' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setDeviceColor(c.id)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: c.color,
                    border: deviceColor === c.id ? '2px solid #f472b6' : '2px solid transparent',
                    transform: deviceColor === c.id ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                  title={c.label}
                />
              ))}
            </div>

            {/* Zoom controls */}
            <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="text-[11.5px]">تكبير/تصغير العرض:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={() => setManualZoomOffset(prev => Math.max(-0.4, prev - 0.08))}
                  className="bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 active-press"
                  style={{ width: '28px', height: '28px' }}
                  title="تصغير"
                >
                  <ZoomOut size={13} />
                </button>
                <span className="text-[11px] font-mono" style={{ minWidth: '36px', textAlign: 'center' }}>{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setManualZoomOffset(prev => Math.min(0.3, prev + 0.08))}
                  className="bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 active-press"
                  style={{ width: '28px', height: '28px' }}
                  title="تكبير"
                >
                  <ZoomIn size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Feature Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
            {[
              '✨ حجز فوري للمواعيد',
              '🔮 استشاري الذكاء الاصطناعي',
              '🛍️ متجر وسلة مشتريات',
              '📱 باركود QR للدخول الذاتي',
            ].map((badge) => (
              <span
                key={badge}
                className="text-pink-100 border border-white/10 font-medium"
                style={{
                  fontSize: '10px',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
