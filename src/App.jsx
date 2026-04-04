import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
import Goals from './pages/Goals';
import Billing from './pages/Billing';
import Investment from './pages/Investment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Authenticated Routes with Shared Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/investment" element={<Investment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
