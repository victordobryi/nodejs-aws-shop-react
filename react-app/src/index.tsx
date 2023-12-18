import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '~/components/App/App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '~/theme';
import { getToken } from './utils/utils';
import axios from 'axios';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      alert('Unauthorized: Authorization header not provided');
    } else if (error.response.status === 403) {
      alert('Forbidden: You do not have permission to access this resource');
    }
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: Infinity },
  },
});

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  worker.start({ onUnhandledRequest: 'bypass' });
}

const authToken = getToken('authorization_token');

if (!authToken) {
  localStorage.setItem('authorization_token', 'dmljdG9yZG9icnlpOlRFU1RfUEFTU1dPUkQ=');
}

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
