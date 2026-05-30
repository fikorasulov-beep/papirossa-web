import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import menuData from "../data/menuData.js";
import { MenuSkeleton } from "../components/Skeleton.jsx";

export default function Menu() {
  const { t, lang, addToCart } = useApp();
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate brief loading on mount — replace with your real fetch.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    if (!filter.trim()) return menuData;
    const f = filter.toLowerCase();
    return menuData.filter((item) => {
      const name = typeof item.name === "object" ? item.name[lang] : item.name;
      const desc =
        typeof item.description === "object" ? item.description[lang] : item.description;
      return (
        (name && name.toLowerCase().includes(f)) ||
        (desc && desc.toLowerCase().includes(f))
      );
    });
  }, [filter, lang]);

  return (
    <section className="menu-section" id="menu">
      <h2 className="section-title">{t("our_menu_title", "Our Menu")}</h2>
      <div className="search-container section-content">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          id="menu-search"
          placeholder={t("menu_search_placeholder", "Search products")}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="section-content">
        {loading ? (
          <MenuSkeleton count={8} />
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>
            {t("no_results", "No products match your search.")}
          </p>
        ) : (
          <ul className="menu-list" id="menu-container">
            {filtered.map((item) => {
              const name = typeof item.name === "object" ? item.name[lang] : item.name;
              const price = typeof item.price === "object" ? item.price[lang] : item.price;
              return (
                <li className="menu-item" key={item.id}>
                  <Link to={`/products?id=${item.id}`} className="menu-card-link">
                    <img src={item.image} alt={name} className="menu-image" />
                    <div className="menu-details">
                      <h3 className="menu-title">{name}</h3>
                      <p className="menu-price">{price}</p>
                    </div>
                  </Link>
                  <button
                    className="button add-to-cart-btn"
                    onClick={() => addToCart(item.id)}
                    aria-label={t("add_to_cart", "Add to Cart")}
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
