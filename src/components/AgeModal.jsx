import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext.jsx";

const texts = {
  en: {
    title: "Age Verification",
    subtitle: "This website contains tobacco products.",
    question: "Are you 18 years of age or older?",
    yes: "Yes, I am 18+",
    no: "No, take me back",
    note: "By entering you agree to our terms & conditions",
  },
  ru: {
    title: "Подтверждение возраста",
    subtitle: "Этот сайт содержит табачную продукцию.",
    question: "Вам исполнилось 18 лет?",
    yes: "Да, мне 18+",
    no: "Нет, вернуться",
    note: "Входя, вы соглашаетесь с условиями использования",
  },
  az: {
    title: "Yaş Doğrulaması",
    subtitle: "Bu sayt tütün məhsulları ehtiva edir.",
    question: "Sizin 18 yaşınız var?",
    yes: "Bəli, 18+",
    no: "Xeyr, geri qayıt",
    note: "Daxil olmaqla şərt və qaydalarımızla razılaşırsınız",
  },
};

export default function AgeModal() {
  const { lang } = useApp();
  const [shown, setShown] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("age-verified")) {
      setShown(true);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  const accept = () => {
    localStorage.setItem("age-verified", "true");
    setHiding(true);
    setTimeout(() => {
      setShown(false);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, 400);
  };

  const decline = () => {
    window.location.href = "https://google.com";
  };

  if (!shown) return null;
  const t = texts[lang] || texts.en;
  return (
    <div id="age-modal-overlay" className={hiding ? "age-modal-hide" : ""}>
      <div className="age-modal">
        <div className="age-modal-icon">🚬</div>
        <h2 className="age-modal-title">{t.title}</h2>
        <p className="age-modal-subtitle">{t.subtitle}</p>
        <p className="age-modal-question">{t.question}</p>
        <div className="age-modal-buttons">
          <button className="age-btn-yes" onClick={accept}>
            {t.yes}
          </button>
          <button className="age-btn-no" onClick={decline}>
            {t.no}
          </button>
        </div>
        <p className="age-modal-note">{t.note}</p>
      </div>
    </div>
  );
}
