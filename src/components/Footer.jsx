import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp, showToast } from "../context/AppContext.jsx";

export default function Footer() {
  const { t, lang } = useApp();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      showToast(t("invalid_email", "Please enter a valid email"), "error");
      return;
    }
    setSubscribing(true);
    // Demo — replace with your own newsletter API (Mailchimp, ConvertKit, etc.)
    setTimeout(() => {
      showToast(
        lang === "ru"
          ? "✅ Вы подписаны на рассылку!"
          : lang === "az"
            ? "✅ Bülletenə abunə oldunuz!"
            : "✅ Subscribed to newsletter!",
        "success"
      );
      setEmail("");
      setSubscribing(false);
    }, 500);
  };

  return (
    <footer className="footer-section">
      <div className="section-content footer-grid">
        {/* Column 1 — Brand */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M22 10C22 10 25 7 28 8C31 9 30 12 27 13C24 14 26 18 30 17" stroke="#f3961c" strokeWidth="2" strokeLinecap="round" />
              <rect x="5" y="25" width="25" height="6" rx="1" transform="rotate(-15 5 25)" fill="#ffffff" />
              <rect x="5" y="25" width="8" height="6" rx="1" transform="rotate(-15 5 25)" fill="#f3961c" />
            </svg>
            <h3>Papirossa</h3>
          </div>
          <p className="footer-tagline">
            {t(
              "footer_tagline",
              "Premium tobacco products curated for true connoisseurs. Quality and style in every puff."
            )}
          </p>
          <div className="social-link-list">
            <a href="#" className="social-link" aria-label="Facebook">
              <i className="fa-brands fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="#" className="social-link" aria-label="X (Twitter)">
              <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <i className="fa-brands fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <i className="fa-brands fa-youtube" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">{t("footer_links", "Quick Links")}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">{t("nav_home", "Home")}</Link>
            </li>
            <li>
              <Link to="/about">{t("nav_about", "About")}</Link>
            </li>
            <li>
              <Link to="/menu">{t("nav_menu", "Menu")}</Link>
            </li>
            <li>
              <Link to="/gallery">{t("nav_gallery", "Gallery")}</Link>
            </li>
            <li>
              <Link to="/testimonials">{t("nav_testimonials", "Testimonials")}</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">{t("footer_contact", "Contact")}</h4>
          <ul className="footer-contact-list">
            <li>
              <i className="fa-solid fa-location-dot"></i>{" "}
              {t("contact_adress", "123 Tobacco Street, City")}
            </li>
            <li>
              <i className="fa-solid fa-phone"></i> +1 (555) 000-0000
            </li>
            <li>
              <i className="fa-regular fa-envelope"></i>{" "}
              <a href="mailto:info@example.com">info@example.com</a>
            </li>
            <li>
              <i className="fa-regular fa-clock"></i>{" "}
              {t("contact_worktime", "Mon-Fri: 9:00 - 18:00")}
            </li>
          </ul>
        </div>

        {/* Column 4 — Newsletter */}
        <div className="footer-col">
          <h4 className="footer-heading">{t("footer_newsletter", "Newsletter")}</h4>
          <p className="footer-newsletter-text">
            {t(
              "footer_newsletter_text",
              "Subscribe to get special offers and new product updates."
            )}
          </p>
          <form className="footer-newsletter-form" onSubmit={subscribe}>
            <input
              type="email"
              placeholder={t("footer_newsletter_placeholder", "Your email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={subscribing} aria-label="Subscribe">
              {subscribing ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
            </button>
          </form>
          <div className="footer-payments">
            <span className="footer-payments-label">
              {t("footer_we_accept", "We accept")}
            </span>
            <div className="footer-payments-icons">
              <i className="fa-brands fa-cc-paypal" title="PayPal"></i>
              <i className="fa-brands fa-cc-visa" title="Visa"></i>
              <i className="fa-brands fa-cc-mastercard" title="Mastercard"></i>
              <i className="fa-brands fa-cc-amex" title="American Express"></i>
              <i className="fa-brands fa-telegram" title="Telegram"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="section-content footer-bottom-content">
          <p className="copyright-text">
            © 2026 Papirossa. {t("footer_rights", "All rights reserved.")}
          </p>
          <p className="policy-text">
            <a href="#" className="policy-link">
              {t("privacy_policy_link", "Privacy Policy")}
            </a>
            <span className="separator">•</span>
            <a href="#" className="policy-link">
              {t("refund_policy_link", "Refund Policy")}
            </a>
            <span className="separator">•</span>
            <a href="#" className="policy-link">
              {t("terms_of_use", "Terms of Use")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
