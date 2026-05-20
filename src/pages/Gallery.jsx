import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext.jsx";
import galleryData from "../data/galleryData.js";

export default function Gallery() {
  const { t } = useApp();
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    if (lightboxSrc) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxSrc]);

  return (
    <>
      <section className="gallery-section" id="gallery">
        <h2 className="section-title">{t("gallery_title", "Gallery")}</h2>
        <div className="section-content">
          <ul className="gallery-list" id="gallery-container">
            {galleryData.map((item, i) => (
              <li className="gallery-item" key={i}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="gallery-image"
                  onClick={() => setLightboxSrc(item.src)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {lightboxSrc && (
        <div
          id="gallery-modal"
          className="modal"
          style={{ display: "flex" }}
          onClick={() => setLightboxSrc(null)}
        >
          <span className="close-modal" onClick={() => setLightboxSrc(null)}>
            &times;
          </span>
          <img
            className="modal-content"
            id="full-img"
            src={lightboxSrc}
            alt="Full size"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
