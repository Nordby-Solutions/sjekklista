import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import './index.css'
import './i18n'
import App from './App.tsx'
import { registerLicense } from '@syncfusion/ej2-base'
import { msalConfig } from './config/authConfig'
import { apiClient } from './data/apiClient'

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

// Set MSAL instance on apiClient for token acquisition
apiClient.setMsalInstance(msalInstance);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>,
)
