import { useApp } from "../context/AppContext.jsx";

export default function About() {
  const { t } = useApp();
  return (
    <section className="about-section" id="about">
      <div className="section-content">
        <div className="about-image-wrapper">
          <img
            src="images/gallery-1.jpg"
            alt="About Papirossa"
            className="about-image"
          />
        </div>
        <div className="about-details">
          <h2 className="section-title">{t("about_us_title", "About Us")}</h2>
          <p className="text">
            {t(
              "about_us_description",
              "At Papirossa we pride ourselves on offering only the finest tobacco, carefully selected for our customers."
            )}
          </p>
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
        </div>
      </div>
    </section>
  );
}
