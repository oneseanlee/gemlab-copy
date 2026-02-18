import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListiclePage from "./pages/ListiclePage";
import TPrime365Page from "./pages/TPrime365Page";
import OceanRaysPage from "./pages/OceanRaysPage";
import GLP1Page from "./pages/GLP1Page";
import NHTOPage from "./pages/NHTOPage";
import NHTOIntakePage from "./pages/NHTOIntakePage";
import GLP1IntakePage from "./pages/GLP1IntakePage";
import UCOSPage from "./pages/UCOSPage";
import GLP1BundlePage from "./pages/GLP1BundlePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import PartnersPage from "./pages/PartnersPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound";
import { useCartSync } from "./hooks/useCartSync";
import './App.css';

const queryClient = new QueryClient();

const AppRoutes = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<OceanRaysPage />} />
      <Route path="/article" element={<ListiclePage />} />
      <Route path="/tprime365" element={<TPrime365Page />} />
      <Route path="/glp1-protocol" element={<GLP1Page />} />
      <Route path="/nhto" element={<NHTOPage />} />
      <Route path="/nhto-intake" element={<NHTOIntakePage />} />
      <Route path="/glp1-intake" element={<GLP1IntakePage />} />
      <Route path="/ucos" element={<UCOSPage />} />
      <Route path="/glp1-ucos" element={<GLP1BundlePage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsConditionsPage />} />
      <Route path="/returns" element={<ReturnPolicyPage />} />
      <Route path="/partners" element={<PartnersPage />} />
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
