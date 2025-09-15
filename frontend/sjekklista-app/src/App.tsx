import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import BasicChecklistDemo from "./pages/BasicChecklistDemo";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/components/AppLayout";
import AppHome from "./pages/app/AppHome";
import { ChecklistTemplateDesigner } from "./pages/app/templates/ChecklistTemplateDesigner";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<AppHome />} />
          <Route path="/signup" element={<AppHome />} />
          <Route path="/design" element={<ChecklistTemplateDesigner />} />
          <Route path="/demo" element={<BasicChecklistDemo />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
