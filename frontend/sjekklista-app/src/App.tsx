import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/components/AppLayout";
import HomePage from "./pages/HomePage";
import { ChecklistTemplateDesignerPage } from "./pages/templates/ChecklistTemplateDesignerPage";
import ChecklistPage from "./pages/ChecklistPage";
import HistoryPage from "./pages/HistoryPage";
import ReportDesignerPage from "./pages/ReportDesignerPage";
import ChecklistTemplatesPage from "./pages/templates/ChecklistTemplatesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route
            path="/checklist-templates"
            element={<ChecklistTemplatesPage />}
          ></Route>
          <Route path="/design" element={<ChecklistTemplateDesignerPage />} />
          <Route
            path="/design/:id"
            element={<ChecklistTemplateDesignerPage />}
          />
          <Route path="/checklist/:id" element={<ChecklistPage />} />
          <Route path="/report-designer" element={<ReportDesignerPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
