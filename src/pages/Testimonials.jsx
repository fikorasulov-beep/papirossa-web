import { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { useApp } from "../context/AppContext.jsx";
import testimonialsData from "../data/testimonialsData.js";

export default function Testimonials() {
  const { t } = useApp();
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperInstance.current = new Swiper(swiperRef.current, {
      loop: true,
      grabCursor: true,
      spaceBetween: 25,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, []);

  return (
    <section className="testimonials-section" id="testimonials">
      <h2 className="section-title">{t("testimonials_title", "Testimonials")}</h2>
      <div className="section-content">
        <div className="slider-container swiper">
          <div className="slider-wrapper" ref={swiperRef}>
            <ul className="testimonials-list swiper-wrapper">
              {testimonialsData.map((tt, i) => (
                <li className="testimonial swiper-slide" key={i}>
                  <img src={tt.image} alt={tt.name} className="user-image" />
                  <h3 className="name">{tt.name}</h3>
                  <i className="feedback">&quot;{tt.feedback}&quot;</i>
                </li>
              ))}
            </ul>
            <div className="swiper-pagination"></div>
            <div className="swiper-slide-button swiper-button-prev"></div>
            <div className="swiper-slide-button swiper-button-next"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
