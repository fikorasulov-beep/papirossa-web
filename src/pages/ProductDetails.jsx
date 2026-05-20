import { Link, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import menuData from "../data/menuData.js";

const backTexts = {
  en: "Back to Menu",
  ru: "Назад в меню",
  az: "Menyuya qayıt",
};
const addTexts = {
  en: "Add to Cart",
  ru: "Добавить в корзину",
  az: "Səbətə əlavə et",
};
const metaData = {
  en: [
    { icon: "fa-star", text: "Rating: ★★★★★ (4.9/5)" },
    { icon: "fa-truck", text: "Free delivery over $30" },
    { icon: "fa-rotate-left", text: "Easy returns within 7 days" },
  ],
  ru: [
    { icon: "fa-star", text: "Рейтинг: ★★★★★ (4.9/5)" },
    { icon: "fa-truck", text: "Бесплатная доставка от $30" },
    { icon: "fa-rotate-left", text: "Возврат в течение 7 дней" },
  ],
  az: [
    { icon: "fa-star", text: "Reytinq: ★★★★★ (4.9/5)" },
    { icon: "fa-truck", text: "$30-dan yuxarı pulsuz çatdırılma" },
    { icon: "fa-rotate-left", text: "7 gün ərzində geri qaytarma" },
  ],
};
const notFoundText = {
  en: "Product not found",
  ru: "Товар не найден",
  az: "Məhsul tapılmadı",
};

export default function ProductDetails() {
  const { lang, addToCart } = useApp();
  const [params] = useSearchParams();
  const productId = parseInt(params.get("id"));
  const item = menuData.find((p) => p.id === productId);

  if (!item) {
    return (
      <div className="product-page section-content">
        <div className="product-not-found">
          <i className="fas fa-box-open"></i>
          <h2>{notFoundText[lang] || notFoundText.en}</h2>
          <Link to="/menu" className="btn-add-cart">
            {backTexts[lang] || backTexts.en}
          </Link>
        </div>
      </div>
    );
  }

  const name = typeof item.name === "object" ? item.name[lang] : item.name;
  const desc =
    typeof item.description === "object" ? item.description[lang] : item.description;
  const price = typeof item.price === "object" ? item.price[lang] : item.price;
  const meta = metaData[lang] || metaData.en;
  const back = backTexts[lang] || backTexts.en;
  const add = addTexts[lang] || addTexts.en;

  return (
    <div className="product-page section-content">
      <div className="product-details-container">
        <div className="product-image-box">
          <img src={item.image} alt={name} />
        </div>
        <div className="product-info-box">
          <Link to="/menu" className="back-link">
            <i className="fas fa-arrow-left"></i> {back}
          </Link>
          <h1 className="product-name">{name}</h1>
          <p className="product-price">{price}</p>
          <div className="product-divider"></div>
          <p className="product-desc">{desc}</p>
          <div className="product-divider"></div>
          <div className="product-meta">
            {meta.map((m, i) => (
              <div className="product-meta-item" key={i}>
                <i className={"fas " + m.icon}></i>
                <span>{m.text}</span>
              </div>
            ))}
          </div>
          <div className="product-actions">
            <button className="btn-add-cart" onClick={() => addToCart(item.id)}>
              <i className="fas fa-cart-plus"></i> {add}
            </button>
            <Link to="/menu" className="btn-back-menu">
              <i className="fas fa-utensils"></i> {back}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
