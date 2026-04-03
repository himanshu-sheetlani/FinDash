import React, { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar
} from 'recharts';

const COLORS = ['#60a5fa', '#f472b6', '#c084fc', '#facc15', '#f87171', '#34d399'];

// Custom Tooltip mimicking shadcn/ui aesthetic
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161616] border border-[#333] p-3 rounded-lg shadow-xl outline-none">
        {label && <p className="text-[#888] text-xs mb-2">{label}</p>}
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm font-medium">
            <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: entry.color }} />
            <span className="text-[#bbb]">{entry.name}:</span>
            <span className="text-white">₹{typeof entry.value === 'number' ? entry.value.toLocaleString('en-IN') : entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function OverviewCharts({ transactions = [] }) {
  
  // 1. Pie Chart Data (Category Distribution)
  const pieData = useMemo(() => {
    const expenses = transactions.filter(t => t.amount < 0 && t.category !== 'Recieved');
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});
    return Object.entries(grouped).map(([name, value], i) => ({
      name,
      value,
      color: COLORS[i % COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  // Total for percentage calculation
  const totalExpense = pieData.reduce((sum, item) => sum + item.value, 0);

  // 2. Line Graph Data (Weekly / Daily Spending Trend)
  const lineData = useMemo(() => {
    const expenses = transactions.filter(t => t.amount < 0);
    // Group by Date string (e.g. 'Feb 20, 2026') 
    const grouped = expenses.reduce((acc, t) => {
      // Very simple extract of Month + Day for display
      const dateStr = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      acc[dateStr] = (acc[dateStr] || 0) + Math.abs(t.amount);
      return acc;
    }, {});
    
    // Sort chronologically using full JS dates
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(`${a}, 2026`) - new Date(`${b}, 2026`));
    
    return sortedDates.map(date => ({
      date,
      spent: grouped[date]
    }));
  }, [transactions]);

  // 3. Bar Graph Data (Monthly Income vs Expense)
  const barData = useMemo(() => {
    const grouped = transactions.reduce((acc, t) => {
      const d = new Date(t.date);
      const monthYear = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); // "Feb 2026"
      if (!acc[monthYear]) {
        acc[monthYear] = { name: monthYear, income: 0, spent: 0 };
      }
      if (t.amount >= 0) {
        acc[monthYear].income += t.amount;
      } else {
        acc[monthYear].spent += Math.abs(t.amount);
      }
      return acc;
    }, {});
    
    // Convert to sorted array
    return Object.values(grouped).sort((a, b) => new Date(a.name) - new Date(b.name));
  }, [transactions]);


  return (
    <div className="space-y-6">
      {/* Top Row: Pie (1/3) & Line (2/3) */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Pie Chart */}
        <div className="w-full lg:w-1/3 bg-[#161616] border border-[#222] rounded-2xl p-5 flex flex-col items-center">
          <h3 className="text-white text-sm font-semibold self-start mb-6 w-full">Category Spending</h3>
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} 
                  formatter={(value, entry) => <span className="text-[#888]">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Percentage Breakdown directly underneath if needed */}
        </div>

        {/* Line Chart */}
        <div className="w-full lg:w-2/3 bg-[#161616] border border-[#222] rounded-2xl p-5">
          <h3 className="text-white text-sm font-semibold mb-6">Spending Trend</h3>
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#555" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10} 
                />
                <YAxis 
                  stroke="#555" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `₹${val/1000}k`}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="spent" 
                  name="Spent"
                  stroke="#60a5fa" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: "#161616" }} 
                  activeDot={{ r: 6, stroke: "#60a5fa", strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Bar Chart */}
      <div className="w-full bg-[#161616] border border-[#222] rounded-2xl p-5">
        <h3 className="text-white text-sm font-semibold mb-6">Monthly Snapshot (Income vs Spent)</h3>
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#555" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                dy={10} 
              />
              <YAxis 
                stroke="#555" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `₹${val/1000}k`}
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#1a1a1a' }} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }} 
                formatter={(value) => <span className="text-[#888]">{value}</span>}
              />
              <Bar 
                dataKey="income" 
                name="Earned" 
                fill="#34d399" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40} 
              />
              <Bar 
                dataKey="spent" 
                name="Spent" 
                fill="#f87171" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
