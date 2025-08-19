import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider, ThemeProvider, Frame, TopBar, Navigation, Button } from '@shopify/polaris';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Admin/Dashboard';
import InvoiceForm from './components/User/InvoiceForm';
import InvoiceList from './components/User/InvoiceList';
import PaymentUpload from './components/User/PaymentUpload';
import PricingTable from './components/Common/PricingTable';
import Toast from './components/Common/Toast';
// import Navbar from './components/Common/Navbar';
import Loader from './components/Common/Loader';
import AnalyticsDashboard from './components/Admin/AnalyticsDashboard';
import UserManagement from './components/Admin/UserManagement';
import OnboardingModal from './components/Auth/OnboardingModal';
import InvoicePDF from './components/User/InvoicePDF';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Polaris Navigation items
  const navigationItems = [
    { label: 'Dashboard', url: '/dashboard', icon: 'HomeMajor' },
    { label: 'Invoices', url: '/invoices', icon: 'OrdersMajor' },
    { label: 'Create Invoice', url: '/create-invoice', icon: 'AddMajor' },
    { label: 'Upload Payment', url: '/upload-payment', icon: 'CashDollarMajor' },
    { label: 'Pricing', url: '/pricing', icon: 'DiscountMajor' },
    { label: 'Analytics', url: '/analytics', icon: 'AnalyticsMajor' },
    { label: 'User Management', url: '/user-management', icon: 'CustomersMajor' },
  ];

  // Polaris TopBar with dark mode toggle
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={null}
      searchField={null}
      secondaryMenu={
        <Button
          onClick={toggleTheme}
          variant="tertiary"
          icon={theme === 'dark' ? 'SunMajor' : 'MoonMajor'}
          accessibilityLabel={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      }
      onNavigationToggle={() => {}}
    />
  );

  // Polaris Navigation
  const navigationMarkup = (
    <Navigation location="/">
      {navigationItems.map(item => (
        <Navigation.Item
          key={item.url}
          label={item.label}
          icon={item.icon}
          url={item.url}
        />
      ))}
    </Navigation>
  );

  return (
    <AppProvider i18n={{}}>
      <ThemeProvider theme={theme === 'dark' ? 'dark-experimental' : 'light'}>
        <Router>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation
          >
            <Toast />
            {/* <Navbar theme={theme} toggleTheme={toggleTheme} /> */}
            {/* Loader can be conditionally rendered based on global loading state */}
            {/* <Loader /> */}
            <Routes>
              <Route path="/" element={<Login theme={theme} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoices" element={<InvoiceList />} />
              <Route path="/create-invoice" element={<InvoiceForm />} />
              <Route path="/upload-payment" element={<PaymentUpload />} />
              <Route path="/pricing" element={<PricingTable />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/user-management" element={<UserManagement theme={theme} />} />
              <Route path="/onboarding" element={<OnboardingModal onClose={() => window.location.replace('/dashboard')} />} />
              <Route path="/invoice-preview" element={<InvoicePDF invoice={{
                invoiceType: 'daily',
                id: 'INV-001',
                date: '2025-08-20',
                voucherNumber: 'VCH-123',
                clientId: 'CL-001',
                clientName: 'Earth Mover Customer',
                bucketRate: 1200,
                breakerRate: 1500,
                bucketStartMeter: 100,
                bucketStopMeter: 120,
                breakerStartMeter: 50,
                breakerStopMeter: 60,
                bata: 200,
                dieselAdvance: 500,
                cashAdvance: 300,
                oldBalance: 1000,
                oldAdBalance: 200,
                totalBucketHours: 20,
                totalBreakerHours: 10,
                totalBucketAmount: 24000,
                totalBreakerAmount: 15000,
                totalAmount: 39000,
                totalBalance: 41000,
                status: 'pending',
                pdfUrl: ''
              }} />} />
            </Routes>
          </Frame>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
