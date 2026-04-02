import React from 'react';
import BalanceCard from '../components/BalanceCard';
import YearlySummaryCard from '../components/YearlySummaryCard';
import CalendarCard from '../components/CalendarCard';
import RecentTransactions from '../components/RecentTransactions';
import GoalsCard from '../components/GoalsCard';

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      <BalanceCard />
      <YearlySummaryCard />
      <CalendarCard />
      <RecentTransactions />
      <GoalsCard />
    </div>
  );
}

export default Dashboard;
