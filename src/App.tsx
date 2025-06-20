import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./pages/About";
import Footer from "./components/Footer/Footer";
import PerfumeCarrousel from "./components/Perfumes/PerfumeCarrosel";
import SocialMediaSection from "./components/SocialMidia/SocialMIdia";
import ProductCatalog from "./components/Perfumes/ProductCatalog";
import ProductInfoSection from "./components/ProductInfoSection/ProductInfoSection";
import AboutLoja from "./components/AboutLoja/AboutLoja";
import { CartProvider, useCart } from "../contexts/CartContext";
import Cart from "./components/Cart/Cart";

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart(); // só precisamos do length para o badge

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={items.length} />
      <Routes>
        <Route
          path="/"
          element={
            <main className="pt-20 min-h-screen flex flex-col">
              <Hero />
              <ProductInfoSection />
              <div className="py-8">
                <PerfumeCarrousel />
              </div>
              <AboutLoja />
              <ProductCatalog />
              <SocialMediaSection />
            </main>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      {isCartOpen && (
        <Cart onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
