import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
import Goals from './pages/Goals';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
