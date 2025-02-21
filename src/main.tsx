import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
// Google provider
import {GoogleOAuthProvider} from '@react-oauth/google';

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Suspense>
              <App />
          </Suspense>
      </GoogleOAuthProvider>
  </StrictMode>,
)
