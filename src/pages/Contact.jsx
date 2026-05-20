import { useState } from "react";
import { useApp, showToast } from "../context/AppContext.jsx";

// Formspree endpoint. Replace with your own form ID.
const FORMSPREE_URL = "https://formspree.io/f/xpqwanan";

export default function Contact() {
  const { t, lang } = useApp();
  const [form, setForm] = useState({ username: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const messages = {
    en: {
      text: "Please enter at least 2 characters.",
      email: "Please enter a valid email address.",
      textarea: "Message must be at least 10 characters.",
      success: "✅ Message sent successfully!",
      error: "Connection error. Please try again.",
    },
    ru: {
      text: "Введите не менее 2 символов.",
      email: "Введите корректный email.",
      textarea: "Сообщение должно содержать не менее 10 символов.",
      success: "✅ Сообщение успешно отправлено!",
      error: "Ошибка соединения. Попробуйте ещё раз.",
    },
    az: {
      text: "Ən az 2 simvol daxil edin.",
      email: "Düzgün email ünvanı daxil edin.",
      textarea: "Mesaj ən az 10 simvol olmalıdır.",
      success: "✅ Mesaj uğurla göndərildi!",
      error: "Əlaqə xətası. Bir daha cəhd edin.",
    },
  };

  const m = messages[lang] || messages.en;

  const validate = () => {
    const errs = {};
    if (form.username.trim().length < 2) errs.username = m.text;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = m.email;
    if (form.message.trim().length < 10) errs.message = m.textarea;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        showToast(m.success, "success");
        setForm({ username: "", email: "", message: "" });
      } else {
        showToast(m.error, "error");
      }
    } catch {
      showToast(m.error, "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title">{t("contact_us_title", "Contact Us")}</h2>

      <div className="section-content contact-flex-container">
        <div className="contact-column">
          <ul className="contact-info-list">
            <li className="contact-info">
              <i className="fa-solid fa-location-dot"></i>
              <p>{t("contact_adress", "Azerbaijan, Baku")}</p>
            </li>
            <li className="contact-info">
              <i className="fa-regular fa-envelope"></i>
              <p>
                <a href="mailto:papirossa2026@gmail.com">papirossa2026@gmail.com</a>
              </p>
            </li>
            <li className="contact-info">
              <i className="fa-solid fa-phone"></i>
              <p>(+994) 55 538 01 88</p>
            </li>
            <li className="contact-info">
              <i className="fa-regular fa-clock"></i>
              <p>{t("contact_worktime", "Monday - Friday: 9:00 a.m. - 5:00 p.m.")}</p>
            </li>
            <li className="contact-info">
              <i className="fa-solid fa-globe"></i>
              <p>www.papirossa-web.com</p>
            </li>
          </ul>

          <form
            className="contact-form"
            id="coffee-contact-form"
            onSubmit={onSubmit}
            noValidate
          >
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              className={"form-input" + (errors.username ? " input-error" : "")}
              value={form.username}
              onChange={onChange}
              required
            />
            {errors.username && <span className="field-error-msg">{errors.username}</span>}

            <input
              type="email"
              name="email"
              placeholder="Your email"
              className={"form-input" + (errors.email ? " input-error" : "")}
              value={form.email}
              onChange={onChange}
              required
            />
            {errors.email && <span className="field-error-msg">{errors.email}</span>}

            <textarea
              name="message"
              placeholder="Your message"
              className={"form-input" + (errors.message ? " input-error" : "")}
              value={form.message}
              onChange={onChange}
              required
            ></textarea>
            {errors.message && <span className="field-error-msg">{errors.message}</span>}

            <button type="submit" className="submit-button" disabled={sending}>
              {sending ? "..." : t("submit_button_text", "Submit")}
            </button>
          </form>
        </div>

        <div className="map-container">
          <iframe
            title="Papirossa Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3434.0302389890353!2d49.872884695296136!3d40.40928367087747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2saz!4v1774893326939!5m2!1sru!2saz"
            width="600"
            height="450"
            className="map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
