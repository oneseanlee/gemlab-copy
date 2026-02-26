import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "./hooks/useCartSync";
import './App.css';

// Route-level code splitting — each page loads on demand
const HomePage = lazy(() => import("./pages/HomePage"));
const ListiclePage = lazy(() => import("./pages/ListiclePage"));
const TPrime365Page = lazy(() => import("./pages/TPrime365Page"));
const GLP1Page = lazy(() => import("./pages/GLP1Page"));
const NHTOPage = lazy(() => import("./pages/NHTOPage"));
const NHTOIntakePage = lazy(() => import("./pages/NHTOIntakePage"));
const GLP1IntakePage = lazy(() => import("./pages/GLP1IntakePage"));
const TPrime365IntakePage = lazy(() => import("./pages/TPrime365IntakePage"));
const UCOSPage = lazy(() => import("./pages/UCOSPage"));
const GLP1BundlePage = lazy(() => import("./pages/GLP1BundlePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsConditionsPage = lazy(() => import("./pages/TermsConditionsPage"));
const ReturnPolicyPage = lazy(() => import("./pages/ReturnPolicyPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const FreeTestosteroneGuidePage = lazy(() => import("./pages/FreeTestosteroneGuidePage"));
const UpsellPage = lazy(() => import("./pages/UpsellPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const TPrimeAdvertorialPage = lazy(() => import("./pages/TPrimeAdvertorialPage"));
const GLP1AdvertorialPage = lazy(() => import("./pages/GLP1AdvertorialPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal loading fallback — visually lightweight to avoid CLS
const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 32, height: 32, border: '3px solid #e5e9f0', borderTopColor: '#3376b0', borderRadius: '50%', animation: 'spin .6s linear infinite' }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const AppRoutes = () => {
  useCartSync();
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article" element={<ListiclePage />} />
        <Route path="/tprime365" element={<TPrime365Page />} />
        <Route path="/tprime365-article" element={<TPrimeAdvertorialPage />} />
        <Route path="/glp1-article" element={<GLP1AdvertorialPage />} />
        <Route path="/glp1-protocol" element={<GLP1Page />} />
        <Route path="/nhto" element={<NHTOPage />} />
        <Route path="/nhto-intake" element={<NHTOIntakePage />} />
        <Route path="/glp1-intake" element={<GLP1IntakePage />} />
        <Route path="/tprime365-intake" element={<TPrime365IntakePage />} />
        <Route path="/ucos" element={<UCOSPage />} />
        <Route path="/glp1-ucos" element={<GLP1BundlePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsConditionsPage />} />
        <Route path="/returns" element={<ReturnPolicyPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/free-testosterone-guide" element={<FreeTestosteroneGuidePage />} />
        <Route path="/free-testosterone-guide/upgrade" element={<UpsellPage />} />
        <Route path="/free-testosterone-guide/thank-you" element={<ThankYouPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
