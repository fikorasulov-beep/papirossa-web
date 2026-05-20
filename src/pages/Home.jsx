import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Home() {
  const { t } = useApp();
  return (
    <section className="hero-section" id="home">
      <div className="section-content">
        <div className="hero-details">
          <h2 className="title">{t("hero_title", "Best Tobacco")}</h2>
          <h3 className="subtitle">
            {t("hero_subtitle", "Make your day special with our tobacco")}
          </h3>
          <p className="description">
            {t(
              "hero_description",
              "Welcome to our tobacco paradise, where every leaf tells a story and every smoke sparks joy."
            )}
          </p>
          <div className="buttons">
            <Link to="/menu" className="button order-now">
              {t("order_now", "Order Now")}
            </Link>
            <Link to="/contact" className="button contact-us">
              {t("contact_us", "Contact Us")}
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="/images/hero-tobacco.jpg"
            alt="Premium tobacco"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
