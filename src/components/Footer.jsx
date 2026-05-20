import { useApp } from "../context/AppContext.jsx";

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="footer-section">
      <div className="section-content">
        <p className="copyright-text">© 2026 Papirossa</p>
        <div className="social-link-list">
          <a
            href="https://www.facebook.com/murad.terlanli.5"
            className="social-link"
            aria-label="Facebook"
          >
            <i className="fa-brands fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="#" className="social-link" aria-label="X (Twitter)">
            <i className="fa-brands fa-x" aria-hidden="true"></i>
          </a>
          <a
            href="https://www.instagram.com/murad_terlanli/"
            className="social-link"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
          </a>
        </div>
        <p className="policy-text">
          <a href="#" className="policy-link">
            {t("privacy_policy_link", "Privacy policy")}
          </a>
          <span className="separator">•</span>
          <a href="#" className="policy-link">
            {t("refund_policy_link", "Refund policy")}
          </a>
        </p>
      </div>
    </footer>
  );
}
