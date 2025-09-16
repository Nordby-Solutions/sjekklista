import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import BasicChecklistDemo from "./pages/BasicChecklistDemo";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/components/AppLayout";
import HomePage from "./pages/app/HomePage";
import { ChecklistTemplateDesigner } from "./pages/app/templates/ChecklistTemplateDesigner";
import ChecklistPage from "./pages/app/ChecklistPage";
import HistoryPage from "./pages/app/HistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<HomePage />} />
          <Route path="/design" element={<ChecklistTemplateDesigner />} />
          <Route path="/demo" element={<BasicChecklistDemo />} />
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
