import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { SidebarProvider } from "./components/SidebarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-zfg71n3bf3lofylt.us.auth0.com"
      clientId="EYvwO5Iwum1taomCcxrmAESUFLb9Rtjh"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </Auth0Provider>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("SW registered", reg))
      .catch((err) => console.error("SW registration failed", err));
  });
}
