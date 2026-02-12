import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListiclePage from "./pages/ListiclePage";
import TPrime365Page from "./pages/TPrime365Page";
import OceanRaysPage from "./pages/OceanRaysPage";
import GLP1Page from "./pages/GLP1Page";
import NHTOPage from "./pages/NHTOPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
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
      <Route path="/glp1" element={<GLP1Page />} />
      <Route path="/nhto" element={<NHTOPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/home" element={<Home />} />
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
