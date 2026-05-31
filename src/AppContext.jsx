import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartModal from "./components/CartModal.jsx";
import AgeModal from "./components/AgeModal.jsx";
import Toast from "./components/Toast.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Menu from "./pages/Menu.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Documentation from "./pages/Documentation.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isDocPage = location.pathname === "/documentation";

  return (
    <>
      <ScrollToTop />
      {!isDocPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/products" element={<ProductDetails />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDocPage && <Footer />}
      <CartModal />
      <AgeModal />
      <Toast />
    </>
  );
}
