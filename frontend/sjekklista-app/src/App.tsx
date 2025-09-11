import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BasicChecklistDemo from "./pages/BasicChecklistDemo";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/components/AppLayout";
import MarketingLayout from "@/components/MarketingLayout";
import AppHome from "./pages/app/AppHome";

function App() {
  return (
    <Router>
      <Routes>
        {/* Marketing pages with full layout */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<BasicChecklistDemo />} />
        </Route>

        {/* App functionality with minimal layout */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppHome />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
