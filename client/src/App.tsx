import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CraftsmenList from './pages/craftsmen/CraftsmenList';
import CraftsmanProfile from './pages/craftsmen/CraftsmanProfile';
import RequestService from './pages/services/RequestService';
import Dashboard from './pages/dashboard/Dashboard';
import AdminPanel from './pages/admin/AdminPanel';
import NotFound from './pages/NotFound';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// I18n
import i18n from './i18n/config';

// RTL Support
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muilt',
});

// Theme Configuration
const createAppTheme = (language: string) => createTheme({
  direction: language === 'ar' ? 'rtl' : 'ltr',
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
  },
  typography: {
    fontFamily: language === 'ar' 
      ? '"Tajawal", "Cairo", "Arial", sans-serif'
      : '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
  },
});

function App() {
  const [language, setLanguage] = React.useState<string>(
    localStorage.getItem('language') || 'ar'
  );

  const theme = React.useMemo(() => createAppTheme(language), [language]);
  const isRtl = language === 'ar';

  React.useEffect(() => {
    i18n.changeLanguage(language);
    document.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <NotificationProvider>
              <Router>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  minHeight: '100vh',
                  direction: isRtl ? 'rtl' : 'ltr' 
                }}>
                  <Navbar 
                    language={language} 
                    onLanguageChange={handleLanguageChange} 
                  />
                  
                  <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/craftsmen" element={<CraftsmenList />} />
                      <Route path="/craftsman/:id" element={<CraftsmanProfile />} />
                      <Route path="/request-service" element={<RequestService />} />
                      <Route path="/dashboard/*" element={<Dashboard />} />
                      <Route path="/admin/*" element={<AdminPanel />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Box>
                  
                  <Footer />
                </Box>
              </Router>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </I18nextProvider>
    </CacheProvider>
  );
}

export default App;
