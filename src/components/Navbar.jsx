import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Navbar() {
  const { t, lang, setLanguage, theme, toggleTheme, cart, openCart } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langPos, setLangPos] = useState(null);
  const langBtnRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  // Toggle body class for mobile menu
  useEffect(() => {
    if (mobileOpen) document.body.classList.add("show-mobile-menu");
    else document.body.classList.remove("show-mobile-menu");
    return () => document.body.classList.remove("show-mobile-menu");
  }, [mobileOpen]);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = () => setLangOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [langOpen]);

 const handleLangBtn = (e) => {
  e.stopPropagation();
  if (!langOpen && langBtnRef.current) {
    const rect = langBtnRef.current.getBoundingClientRect();
    const dropW = 155;
    const dropH = 140; // approximate dropdown height
    let left = rect.right - dropW;
    if (left < 8) left = 8;
    if (left + dropW > window.innerWidth - 8) left = window.innerWidth - dropW - 8;
    // If not enough space below, open upward
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow >= dropH + 16 ? rect.bottom + 4 : rect.top - dropH - 4;
    setLangPos({ top, left });
  }
  setLangOpen((o) => !o);
};

  const pickLang = (e, code) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguage(code);
    setLangOpen(false);
  };

  return (
    <header>
      <nav className="navbar section-content">
        <Link to="/" className="nav-logo" aria-label="Papirossa — Home">
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M22 10C22 10 25 7 28 8C31 9 30 12 27 13C24 14 26 18 30 17"
              stroke="#f3961c"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18 5C18 5 21 2 24 3C27 4 26 7 23 8"
              stroke="#f3961c"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <rect
              x="5"
              y="25"
              width="25"
              height="6"
              rx="1"
              transform="rotate(-15 5 25)"
              fill="#ffffff"
            />
            <rect
              x="5"
              y="25"
              width="8"
              height="6"
              rx="1"
              transform="rotate(-15 5 25)"
              fill="#f3961c"
            />
          </svg>
          <h2 className="logo-text">Papirossa</h2>
        </Link>

        <ul className="nav-menu">
          <li>
            <button
              type="button"
              id="menu-close-button"
              className="fas fa-times"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />
          </li>
          <li className="nav-item">
            <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              {t("nav_home", "Home")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              {t("nav_about", "About")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/menu" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              {t("nav_menu", "Menu")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/testimonials"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              {t("nav_testimonials", "Testimonials")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/gallery" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              {t("nav_gallery", "Gallery")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              {t("nav_contact", "Contact")}
            </NavLink>
          </li>

          <li className="nav-menu-actions">
            <div className="lang-dropdown">
              <button type="button" className="lang-button" ref={langBtnRef} onClick={handleLangBtn}>
                <i className="fas fa-globe"></i>
                <span id="current-lang">{lang.toUpperCase()}</span>
                <i className="fas fa-chevron-down"></i>
              </button>
              <div
                className={"lang-options" + (langOpen ? " active" : "")}
                style={
                  langOpen && langPos
                    ? { position: "fixed", top: langPos.top + "px", left: langPos.left + "px" }
                    : undefined
                }
              >
                <a href="#" onClick={(e) => pickLang(e, "en")}>
                  English
                </a>
                <a href="#" onClick={(e) => pickLang(e, "ru")}>
                  Русский
                </a>
                <a href="#" onClick={(e) => pickLang(e, "az")}>
                  Azərbaycanca
                </a>
              </div>
            </div>

            <button
              type="button"
              id="cart-btn"
              className="nav-cart"
              onClick={openCart}
              aria-label="Open cart"
            >
              <i className="fas fa-shopping-cart"></i>
              <span id="cart-count">{cart.length}</span>
            </button>

            <button
              type="button"
              id="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <i className={"fas " + (theme === "dark" ? "fa-sun" : "fa-moon")}></i>
            </button>
          </li>
        </ul>

        <div className="header-actions">
          <button
            type="button"
            id="menu-open-button"
            className="fas fa-bars"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          />
        </div>
      </nav>
    </header>
  );
}
