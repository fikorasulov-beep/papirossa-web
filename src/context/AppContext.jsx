import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { i18n } from "../data/i18n.js";
import menuData from "../data/menuData.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ---------- Language ----------
  const [lang, setLang] = useState(() => localStorage.getItem("selectedLang") || "en");

  const setLanguage = useCallback((next) => {
    setLang(next);
    localStorage.setItem("selectedLang", next);
  }, []);

  const t = useCallback(
    (key, fallback = "") => (i18n[lang] && i18n[lang][key]) || fallback || key,
    [lang]
  );

  // ---------- Theme ----------
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // ---------- Cart ----------
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("papirossa_cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("papirossa_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback(
    (productId) => {
      const item = menuData.find((p) => p.id === productId);
      if (!item) return;
      const displayName = typeof item.name === "object" ? item.name[lang] : item.name;
      setCart((prev) => [...prev, { ...item, displayName }]);
      const toastMsg = {
        en: `✅ "${displayName}" added to cart!`,
        ru: `✅ "${displayName}" добавлен в корзину!`,
        az: `✅ "${displayName}" səbətə əlavə edildi!`,
      };
      showToast(toastMsg[lang] || toastMsg.en, "success");
    },
    [lang]
  );

  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart
    .reduce((sum, item) => {
      const priceStr = typeof item.price === "string" ? item.price : `$${item.price}`;
      return sum + (parseFloat(priceStr.replace("$", "")) || 0);
    }, 0)
    .toFixed(2);

  // ---------- Cart modal ----------
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // ---------- Body overflow when modals open ----------
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const value = {
    lang,
    setLanguage,
    t,
    theme,
    toggleTheme,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    isCartOpen,
    openCart,
    closeCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

// ---------- Toast helper (simple global pub/sub) ----------
const toastListeners = new Set();
export function showToast(message, type = "success") {
  toastListeners.forEach((fn) => fn({ message, type, id: Date.now() + Math.random() }));
}
export function subscribeToast(fn) {
  toastListeners.add(fn);
  return () => toastListeners.delete(fn);
}
