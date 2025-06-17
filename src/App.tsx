import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './pages/About';
import Footer from './components/Footer/Footer';
import PerfumeCarrousel from './components/PerfumeCarrosel/PerfumeCarrosel';
import SocialMediaSection from './components/SocialMidia/SocialMIdia';
import ProductCatalog from './components/ProductCatalog/ProductCatalog';
import ProductInfoSection from './components/ProductInfoSection/ProductInfoSection';
import AboutLoja from './components/AboutLoja/AboutLoja';
export default function App() {
 

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <Header  />
      <Routes>
        <Route
          path="/"
          element={
            <main className="pt-20 min-h-screen flex flex-col">
              <Hero />
              <ProductInfoSection/>
          
              <div className="py-8">
                <PerfumeCarrousel />
               
              </div>
                  <AboutLoja />
              <ProductCatalog/>
               <SocialMediaSection />
            </main>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}
