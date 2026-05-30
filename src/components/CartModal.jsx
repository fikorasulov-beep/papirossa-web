import { useState, useEffect } from "react";
import { useApp, showToast } from "../context/AppContext.jsx";
import PayPalButton from "./PayPalButton.jsx";
import { TELEGRAM_BOT_TOKEN as BOT_TOKEN, TELEGRAM_CHAT_ID as CHAT_ID } from "../config.js";

export default function CartModal() {
  const { isCartOpen, closeCart, cart, removeFromCart, clearCart, cartTotal, t, lang } = useApp();
  const [checkout, setCheckout] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isCartOpen) {
      // Reset checkout state when modal closes
      setCheckout(false);
      setName("");
      setPhone("");
      setErrors({});
    }
  }, [isCartOpen]);

  const onBackdropClick = (e) => {
    if (e.target.id === "cart-modal") closeCart();
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      showToast(t("cart_empty", "Your cart is empty"), "error");
      return;
    }
    setCheckout(true);
  };

  const validate = () => {
    const errs = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name =
        lang === "ru"
          ? "Введите не менее 2 символов."
          : lang === "az"
            ? "Ən az 2 simvol daxil edin."
            : "Please enter at least 2 characters.";
    }
    if (!/^\+?[\d\s\-()]{7,}$/.test(phone.trim())) {
      errs.phone =
        lang === "ru"
          ? "Введите корректный номер телефона."
          : lang === "az"
            ? "Düzgün telefon nömrəsi daxil edin."
            : "Please enter a valid phone number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    let message = `🚀 *New order in Papirossa!*\n\n👤 *Client:* ${name}\n📞 *Phone:* ${phone}\n\n📦 *Products:*\n`;
    cart.forEach((item) => {
      const itemName = typeof item.name === "object" ? item.name[lang] || item.name.en : item.name;
      message += `- ${itemName} (${item.price})\n`;
    });
    message += `\n💰 *Total:* $${cartTotal}`;

    if (BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") {
      // Demo mode — show success without sending
      showToast(
        lang === "ru"
          ? `✅ Заказ отправлен (demo), ${name}!`
          : lang === "az"
            ? `✅ Sifariş göndərildi (demo), ${name}!`
            : `✅ Order sent (demo), ${name}!`,
        "success"
      );
      clearCart();
      closeCart();
      return;
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" }),
        }
      );
      if (response.ok) {
        showToast(
          lang === "ru"
            ? `✅ Заказ отправлен, ${name}!`
            : lang === "az"
              ? `✅ Sifariş göndərildi, ${name}!`
              : `✅ Order sent, ${name}!`,
          "success"
        );
        clearCart();
        closeCart();
      } else {
        const err = await response.json();
        showToast("Telegram error: " + (err.description || "unknown"), "error");
      }
    } catch {
      showToast(lang === "ru" ? "Ошибка соединения." : "Connection error.", "error");
    }
  };

  if (!isCartOpen) return null;

  return (
    <div
      id="cart-modal"
      className="modal"
      style={{ display: "flex" }}
      onClick={onBackdropClick}
    >
      <div className="cart-container">
        <span className="close-cart" onClick={closeCart}>
          &times;
        </span>
        <h2 className="section-title">{t("cart_title", "Your Cart")}</h2>
        <div className="cart-scroll-area">
          <ul id="cart-items-list">
            {cart.length === 0 ? (
              <p className="cart-empty-msg">{t("cart_empty", "Your cart is empty")}</p>
            ) : (
              cart.map((item, index) => {
                const itemName =
                  typeof item.name === "object" ? item.name[lang] : item.name;
                const priceStr =
                  typeof item.price === "string" ? item.price : `$${item.price}`;
                return (
                  <div className="cart-item" key={index}>
                    <span>
                      {itemName} — {priceStr}
                    </span>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="cart-remove-btn"
                    >
                      {t("cart_remove", "Remove")}
                    </button>
                  </div>
                );
              })
            )}
          </ul>
        </div>
        <div className="cart-footer">
          <div className="total-amount">
            Total: <span id="cart-total">${cartTotal}</span>
          </div>
          {!checkout && (
            <button
              type="button"
              className="button order-now"
              onClick={handleCheckoutClick}
            >
              {t("btn_checkout", "Checkout")}
            </button>
          )}
        </div>

        {checkout && (
          <div id="checkout-form-container">
            <hr />
            <h3>{t("order_details_title", "Order Details")}</h3>
            <form id="order-form" onSubmit={submitOrder} noValidate>
              <input
                type="text"
                placeholder={t("your_name", "Your Name")}
                required
                className={"form-input" + (errors.name ? " input-error" : "")}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                }}
              />
              {errors.name && <span className="field-error-msg">{errors.name}</span>}
              <input
                type="tel"
                placeholder={t("your_phone", "Your Phone")}
                required
                className={"form-input" + (errors.phone ? " input-error" : "")}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                }}
              />
              {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
              <button type="submit" className="button confirm-btn">
                {t("confirm_telegram_button", "Send via Telegram")}
              </button>
            </form>

            <div className="checkout-divider">
              <span>{t("or_pay_with", "or pay with")}</span>
            </div>

            <PayPalButton
              amount={parseFloat(cartTotal)}
              description={`Papirossa order — ${cart.length} item(s)`}
              onSuccess={(details) => {
                showToast(
                  lang === "ru"
                    ? `✅ Оплата прошла успешно!`
                    : lang === "az"
                      ? `✅ Ödəniş uğurla tamamlandı!`
                      : `✅ Payment completed!${details?.demo ? " (demo mode)" : ""}`,
                  "success"
                );
                clearCart();
                closeCart();
              }}
              onError={(err) => {
                showToast(
                  (lang === "ru" ? "Ошибка PayPal: " : "PayPal error: ") + (err?.message || ""),
                  "error"
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
