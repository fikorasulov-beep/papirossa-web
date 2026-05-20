import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-desc">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="error-links">
          <Link to="/" className="error-btn error-btn-primary">
            <i className="fas fa-home"></i> Go Home
          </Link>
          <Link to="/menu" className="error-btn error-btn-secondary">
            <i className="fas fa-utensils"></i> View Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
