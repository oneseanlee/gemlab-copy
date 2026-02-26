import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListiclePage from "./pages/ListiclePage";
import TPrime365Page from "./pages/TPrime365Page";
import HomePage from "./pages/HomePage";
import GLP1Page from "./pages/GLP1Page";
import NHTOPage from "./pages/NHTOPage";
import NHTOIntakePage from "./pages/NHTOIntakePage";
import GLP1IntakePage from "./pages/GLP1IntakePage";
import TPrime365IntakePage from "./pages/TPrime365IntakePage";
import UCOSPage from "./pages/UCOSPage";
import GLP1BundlePage from "./pages/GLP1BundlePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import PartnersPage from "./pages/PartnersPage";
import CheckoutPage from "./pages/CheckoutPage";
import GuidesPage from "./pages/GuidesPage";
import FreeTestosteroneGuidePage from "./pages/FreeTestosteroneGuidePage";
import UpsellPage from "./pages/UpsellPage";
import ThankYouPage from "./pages/ThankYouPage";
import TPrimeAdvertorialPage from "./pages/TPrimeAdvertorialPage";
import GLP1AdvertorialPage from "./pages/GLP1AdvertorialPage";
import NotFound from "./pages/NotFound";
import { useCartSync } from "./hooks/useCartSync";
import './App.css';

const queryClient = new QueryClient();

const AppRoutes = () => {
  useCartSync();
  return (
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
