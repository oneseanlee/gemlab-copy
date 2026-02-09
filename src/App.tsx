import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListiclePage from "./pages/ListiclePage";
import TPrime365Page from "./pages/TPrime365Page";
import OceanRaysPage from "./pages/OceanRaysPage";
import NotFound from "./pages/NotFound";
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OceanRaysPage />} />
        <Route path="/article" element={<ListiclePage />} />
        <Route path="/tprime365" element={<TPrime365Page />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
