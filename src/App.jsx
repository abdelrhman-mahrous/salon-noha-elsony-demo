import React, { useState } from 'react';
import IphoneFrame from './components/IphoneFrame';
import HomeScreen from './screens/HomeScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import StoreScreen from './screens/StoreScreen';
import ProfileScreen from './screens/ProfileScreen';

// Modals
import BookingModal from './components/BookingModal';
import ProblemDetailModal from './components/ProblemDetailModal';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import HairstyleAdvisorModal from './components/HairstyleAdvisorModal';
import QrCodeModal from './components/QrCodeModal';
import RatingModal from './components/RatingModal';
import NotificationsModal from './components/NotificationsModal';

// Initial Mock Data
import { 
  initialUserData, 
  initialAppointmentsData, 
  sampleNotifications, 
  servicesData, 
  productsData,
  offersData 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'appointments' | 'store' | 'profile'
  const [user, setUser] = useState(initialUserData);
  const [appointments, setAppointments] = useState(initialAppointmentsData);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [cartItems, setCartItems] = useState([
    { ...productsData[0], quantity: 1 },
    { ...productsData[1], quantity: 1 }
  ]);

  // Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState(null);
  const [selectedOfferToBook, setSelectedOfferToBook] = useState(null);

  const [problemDetailModalOpen, setProblemDetailModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [hairstyleAdvisorOpen, setHairstyleAdvisorOpen] = useState(false);

  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [selectedAppointmentForQr, setSelectedAppointmentForQr] = useState(null);

  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedAppointmentForRating, setSelectedAppointmentForRating] = useState(null);

  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);

  // Live Simulated Push Notification Banner State
  const [activeNotification, setActiveNotification] = useState(null);

  // Dynamic Island Current Live Event (null = compact native hardware pill)
  const [dynamicIslandEvent, setDynamicIslandEvent] = useState(null);


  // ── Handlers ──
  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleBookService = (service) => {
    setSelectedServiceToBook(service);
    setSelectedOfferToBook(null);
    setBookingModalOpen(true);
  };

  const handleSelectOffer = (offer) => {
    setSelectedOfferToBook(offer);
    setSelectedServiceToBook(null);
    setBookingModalOpen(true);
  };

  const handleOpenProblemDetail = (problem) => {
    setSelectedProblem(problem);
    setProblemDetailModalOpen(true);
  };

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
    setProductDetailModalOpen(true);
  };

  const handleAddProductToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Trigger slight notification
    triggerPushNotification({
      id: `notif_${Date.now()}`,
      title: 'تمت إضافة المنتج للسلة 🛍️',
      message: `تمت إضافة "${product.name}" بنجاح لسلة التسوق الخاصة بك.`,
      time: 'الآن',
      type: 'cart',
    });
  };

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleBookingSuccess = (newAppointment) => {
    setAppointments(prev => [newAppointment, ...prev]);
    setUser(prev => ({
      ...prev,
      points: prev.points + 50,
      pointsValue: prev.pointsValue + 10,
      totalBookings: prev.totalBookings + 1,
    }));

    // Trigger Dynamic Island update
    setDynamicIslandEvent({
      type: 'booking_success',
      title: 'تم تأكيد موعدك بنجاح ✨',
      subtitle: `${newAppointment.serviceName} - ${newAppointment.time}`,
      badge: 'مؤكد',
    });

    // Trigger Push Notification
    triggerPushNotification({
      id: `notif_${Date.now()}`,
      title: 'تم تأكيد حجز الموعد بنجاح ✨',
      message: `موعدك لـ "${newAppointment.serviceName}" مع ${newAppointment.specialistName} تم تأكيده.`,
      time: 'الآن',
      type: 'appointment',
    });
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'ملغي', statusCode: 'cancelled' } 
          : apt
      )
    );
    triggerPushNotification({
      id: `notif_${Date.now()}`,
      title: 'تم إلغاء الموعد',
      message: 'تم إلغاء حجز الموعد بنجاح بناءً على طلبك.',
      time: 'الآن',
      type: 'appointment',
    });
  };

  const handleRatingSubmitted = (appointmentId, rating, comment) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, isRated: true, userRating: rating } 
          : apt
      )
    );
    setUser(prev => ({
      ...prev,
      points: prev.points + 50,
      pointsValue: prev.pointsValue + 10,
    }));
    triggerPushNotification({
      id: `notif_${Date.now()}`,
      title: 'شكراً لتقييمك! 💖',
      message: 'تمت إضافة 50 نقطة ولاء جديدة لحسابك تقديراً لرأيك القيم.',
      time: 'الآن',
      type: 'points',
    });
  };

  const triggerPushNotification = (notif) => {
    setActiveNotification(notif);
    setNotifications(prev => [notif, ...prev]);
  };

  const handleTriggerCustomNotification = (type) => {
    if (type === 'appointment') {
      triggerPushNotification({
        id: `notif_${Date.now()}`,
        title: 'تذكير بموعدك في الصالون 📅',
        message: 'موعدك غداً الساعة 5:30 م مع أ/ نادية محمود لجلسة الفيلر والقص. نحن بانتظارك!',
        time: 'الآن',
        type: 'appointment',
      });
    } else if (type === 'offer') {
      triggerPushNotification({
        id: `notif_${Date.now()}`,
        title: 'خصم خاص 30% لنهاية الأسبوع 🌸',
        message: 'استمتعي بخصم 30% على كافة جلسات الهيدرافيشل والسبا الملكي عند الحجز اليوم!',
        time: 'الآن',
        type: 'offer',
      });
    } else if (type === 'points') {
      triggerPushNotification({
        id: `notif_${Date.now()}`,
        title: 'هدية نقاط ولاء VIP 🎁',
        message: 'تمت إضافة 100 نقطة ولاء بقيمة 20 ج.م لحسابك الذهبي كهدية نهاية الأسبوع!',
        time: 'الآن',
        type: 'points',
      });
    }
  };

  const handleMarkAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleResetData = () => {
    setUser(initialUserData);
    setAppointments(initialAppointmentsData);
    setNotifications(sampleNotifications);
    setCartItems([
      { ...productsData[0], quantity: 1 },
      { ...productsData[1], quantity: 1 }
    ]);
    triggerPushNotification({
      id: `notif_${Date.now()}`,
      title: 'تمت إعادة ضبط البيانات التجريبية 🔄',
      message: 'تمت استعادة كافة البيانات الافتراضية بنجاح.',
      time: 'الآن',
      type: 'points',
    });
  };

  return (
    <IphoneFrame
      activeNotification={activeNotification}
      onCloseNotification={() => setActiveNotification(null)}
      onNotificationClick={(notif) => {
        if (notif.type === 'appointment') setActiveTab('appointments');
        else if (notif.type === 'offer') setActiveTab('home');
        else if (notif.type === 'cart') setCartDrawerOpen(true);
      }}
      onTriggerCustomNotification={handleTriggerCustomNotification}
      dynamicIslandEvent={dynamicIslandEvent}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      cartItemsCount={cartItemsCount}
    >
      {/* Tab Screen Routing */}
      {activeTab === 'home' && (
        <HomeScreen
          user={user}
          unreadNotifsCount={unreadNotifsCount}
          onOpenNotifications={() => setNotificationsModalOpen(true)}
          onBookService={handleBookService}
          onSelectOffer={handleSelectOffer}
          onOpenProblemDetail={handleOpenProblemDetail}
          onOpenProductDetail={handleOpenProductDetail}
          onOpenHairstyleAdvisor={() => setHairstyleAdvisorOpen(true)}
          onAddProductToCart={handleAddProductToCart}
          onNavigateToTab={(tab) => setActiveTab(tab)}
        />
      )}

      {activeTab === 'appointments' && (
        <AppointmentsScreen
          appointments={appointments}
          onOpenQrCode={(apt) => {
            setSelectedAppointmentForQr(apt);
            setQrCodeModalOpen(true);
          }}
          onOpenRating={(apt) => {
            setSelectedAppointmentForRating(apt);
            setRatingModalOpen(true);
          }}
          onCancelAppointment={handleCancelAppointment}
          onBookNewService={() => {
            setSelectedServiceToBook(servicesData[0]);
            setBookingModalOpen(true);
          }}
        />
      )}

      {activeTab === 'store' && (
        <StoreScreen
          onOpenProductDetail={handleOpenProductDetail}
          onAddProductToCart={handleAddProductToCart}
          onOpenCart={() => setCartDrawerOpen(true)}
          cartItemsCount={cartItemsCount}
        />
      )}

      {activeTab === 'profile' && (
        <ProfileScreen
          user={user}
          onOpenNotifications={() => setNotificationsModalOpen(true)}
          onTriggerDemoNotification={() => handleTriggerCustomNotification('appointment')}
          onTriggerPointsReward={() => handleTriggerCustomNotification('points')}
          onResetData={handleResetData}
        />
      )}



      {/* ── Modals & Popups ── */}
      <BookingModal
        isOpen={bookingModalOpen}
        service={selectedServiceToBook}
        offer={selectedOfferToBook}
        onClose={() => setBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      <ProblemDetailModal
        isOpen={problemDetailModalOpen}
        problem={selectedProblem}
        onClose={() => setProblemDetailModalOpen(false)}
        onBookService={handleBookService}
        onAddProductToCart={handleAddProductToCart}
      />

      <ProductDetailModal
        isOpen={productDetailModalOpen}
        product={selectedProduct}
        onClose={() => setProductDetailModalOpen(false)}
        onAddToCart={handleAddProductToCart}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckoutSuccess={() => {
          triggerPushNotification({
            id: `notif_${Date.now()}`,
            title: 'تم استلام طلبك بنجاح 🛍️',
            message: 'طلبك قيد التجهيز الآن وسيصلك في أقرب وقت.',
            time: 'الآن',
            type: 'cart',
          });
        }}
      />

      <HairstyleAdvisorModal
        isOpen={hairstyleAdvisorOpen}
        onClose={() => setHairstyleAdvisorOpen(false)}
        onBookHairstyle={handleBookService}
      />

      <QrCodeModal
        isOpen={qrCodeModalOpen}
        appointment={selectedAppointmentForQr}
        onClose={() => setQrCodeModalOpen(false)}
      />

      <RatingModal
        isOpen={ratingModalOpen}
        appointment={selectedAppointmentForRating}
        onClose={() => setRatingModalOpen(false)}
        onRatingSubmitted={handleRatingSubmitted}
      />

      <NotificationsModal
        isOpen={notificationsModalOpen}
        onClose={() => setNotificationsModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsAsRead}
      />
    </IphoneFrame>
  );
}
