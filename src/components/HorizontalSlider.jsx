import React, { useRef } from 'react';

export default function HorizontalSlider({ className = '', children }) {
  const sliderRef = useRef(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });

  const handleMouseDown = (event) => {
    if (event.button !== 0) return;
    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startScroll: sliderRef.current.scrollLeft,
    };
  };

  const handleMouseMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      const isRtl = getComputedStyle(sliderRef.current).direction === 'rtl';
      sliderRef.current.scrollLeft = drag.startScroll + (isRtl ? -delta : delta);
    }
  };

  const stopDragging = () => {
    dragRef.current.active = false;
  };

  const preventDraggedClick = (event) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.moved = false;
  };

  return (
    <div
      ref={sliderRef}
      className={`home-slider ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onClickCapture={preventDraggedClick}
    >
      {children}
    </div>
  );
}
