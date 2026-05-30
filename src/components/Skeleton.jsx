// Reusable skeleton loaders for cards (product/menu) and gallery thumbnails.

export function MenuSkeleton({ count = 8 }) {
  return (
    <ul className="menu-list" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <li className="menu-item skeleton-card" key={i}>
          <div className="menu-card-link">
            <div className="skeleton skeleton-image" />
            <div className="menu-details">
              <div className="skeleton skeleton-line skeleton-line-title" />
              <div className="skeleton skeleton-line skeleton-line-short" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function GallerySkeleton({ count = 6 }) {
  return (
    <ul className="gallery-list" aria-busy="true" aria-label="Loading gallery">
      {Array.from({ length: count }).map((_, i) => (
        <li className="gallery-item" key={i}>
          <div className="skeleton skeleton-image skeleton-gallery-thumb" />
        </li>
      ))}
    </ul>
  );
}
