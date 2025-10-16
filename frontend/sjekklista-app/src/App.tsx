import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/components/AppLayout";
import { ChecklistTemplateDesignerPage } from "./pages/templates/ChecklistTemplateDesignerPage";
import ChecklistPage from "./pages/ChecklistPage";
import ReportDesignerPage from "./pages/ReportDesignerPage";
import ChecklistTemplatesPage from "./pages/templates/ChecklistTemplatesPage";
import ChecklistDashboard from "./pages/ChecklistDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ChecklistDashboard />} />
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
