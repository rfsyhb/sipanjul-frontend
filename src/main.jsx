import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from './utils/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Jumlah percobaan ulang
      refetchOnWindowFocus: false, // Tidak refetch otomatis saat fokus ke window
      staleTime: 5 * 60 * 1000, // Data fresh selama 5 menit
    },
  },
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
        {/* DevTools hanya aktif di mode pengembangan */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);
