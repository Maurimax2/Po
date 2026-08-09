import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';

// The home page ships in the main bundle; everything else is split, so the
// first visit over mobile data downloads only what it needs.
const Catalogue = lazy(() => import('./pages/Catalogue'));
const ProductPage = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Keeps the page height stable while a route chunk loads. */
function RouteFallback() {
  return <div className="min-h-[70vh]" aria-hidden />;
}

export default function App() {
  return (
    <LangProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="catalogue" element={<Catalogue />} />
                <Route path="catalogue/:category" element={<Catalogue />} />
                <Route path="produit/:slug" element={<ProductPage />} />
                <Route path="panier" element={<Cart />} />
                <Route path="commande" element={<Checkout />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </LangProvider>
  );
}
