import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/components/AppLayout";
import HomePage from "./pages/HomePage";
import { ChecklistTemplateDesignerPage } from "./pages/ChecklistTemplateDesignerPage";
import ChecklistPage from "./pages/ChecklistPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/design" element={<ChecklistTemplateDesignerPage />} />
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/checklist/:id" element={<ChecklistPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
