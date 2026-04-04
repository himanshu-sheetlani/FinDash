const INITIAL_BALANCE = 10000;
const USER_STORAGE_KEY = 'finance_dashboard_user';

const DEFAULT_TRANSACTIONS = [
  { id: 1, title: "House Rent", date: "Mar 15, 2026", amount: -5000, category: "Essentials" },
  { id: 2, title: "Cloths", date: "Mar 10, 2026", amount: -1000, category: "Wants" },
  { id: 3, title: "Salary", date: "Mar 8, 2026", amount: 35000, category: "Recieved" },
  { id: 4, title: "Full Stack Course", date: "Mar 2, 2026", amount: -500, category: "Learning" },
  { id: 5, title: "Groceries", date: "Feb 28, 2026", amount: -2500, category: "Essentials" },
  { id: 6, title: "Freelance Client", date: "Feb 25, 2026", amount: 15000, category: "Recieved" },
  { id: 7, title: "Emergency Fund", date: "Feb 22, 2026", amount: -5000, category: "Saving" },
  { id: 8, title: "Credit Card Bill", date: "Feb 20, 2026", amount: -4500, category: "Dept" },
  { id: 9, title: "Movie Tickets", date: "Feb 18, 2026", amount: -800, category: "Wants" },
  { id: 10, title: "Udemy Subscription", date: "Feb 15, 2026", amount: -1200, category: "Learning" },
  // Jan 2026
  { id: 11, title: "House Rent", date: "Jan 15, 2026", amount: -5000, category: "Essentials" },
  { id: 12, title: "Salary", date: "Jan 8, 2026", amount: 35000, category: "Recieved" },
  { id: 13, title: "New Year Gifts", date: "Jan 4, 2026", amount: -2000, category: "Wants" },
  { id: 14, title: "New Laptop", date: "Jan 2, 2026", amount: -32000, category: "Essentials" },
  { id: 15, title: "Groceries", date: "Jan 12, 2026", amount: -3000, category: "Essentials" },
  // Dec 2025
  { id: 16, title: "House Rent", date: "Dec 15, 2025", amount: -5000, category: "Essentials" },
  { id: 17, title: "Salary", date: "Dec 8, 2025", amount: 35000, category: "Recieved" },
  { id: 18, title: "Holiday Vacation", date: "Dec 20, 2025", amount: -15000, category: "Saving" },
  { id: 19, title: "Electricity Bill", date: "Dec 5, 2025", amount: -1500, category: "Dept" },
  // Nov 2025
  { id: 20, title: "House Rent", date: "Nov 15, 2025", amount: -5000, category: "Essentials" },
  { id: 21, title: "Salary", date: "Nov 8, 2025", amount: 35000, category: "Recieved" },
  { id: 22, title: "Diwali Sweet", date: "Nov 1, 2025", amount: -4000, category: "Wants" },
  { id: 23, title: "React Workshop", date: "Nov 10, 2025", amount: -1000, category: "Learning" },
];

export function getTransactions() {
  const stored = localStorage.getItem('transactions');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.length <= 11) {
      localStorage.setItem('transactions', JSON.stringify(DEFAULT_TRANSACTIONS));
      return DEFAULT_TRANSACTIONS;
    }
    return parsed;
  }
  localStorage.setItem('transactions', JSON.stringify(DEFAULT_TRANSACTIONS));
  return DEFAULT_TRANSACTIONS;
}

export function getStoredUser() {
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored);
    if (parsed?.name && parsed?.email) {
      return parsed;
    }
  } catch (error) {
    console.error('Failed to parse stored user', error);
  }

  localStorage.removeItem(USER_STORAGE_KEY);
  return null;
}

export function saveUser(user) {
  const normalizedUser = {
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
  };

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(normalizedUser));
  return normalizedUser;
}

export function clearStoredUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function addTransaction(transaction) {
  const transactions = getTransactions();
  const newTx = {
    ...transaction,
    id: Date.now()
  };
  const newTransactions = [newTx, ...transactions];
  localStorage.setItem('transactions', JSON.stringify(newTransactions));
  window.dispatchEvent(new Event('transactions_updated'));
  return newTransactions;
}

export function getCalculatedBalance() {
  const transactions = getTransactions();
  const sum = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  return INITIAL_BALANCE + sum;
}

export function formatCurrency(amount) {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN').format(absAmount);
  return `${isNegative ? '-' : '+'}₹${formatted}`;
}

export function formatAbsoluteCurrency(amount) {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN').format(absAmount);
  return `₹${formatted}`;
}

const DEFAULT_GOALS = [
  { id: 1, title: "Annual Vacation", target: 12000, current: 8000, icon: "Plane" },
  { id: 2, title: "Car", target: 500000, current: 75000, icon: "Car" },
  { id: 3, title: "House", target: 3000000, current: 28000, icon: "Home" },
];

export function getGoals() {
  const stored = localStorage.getItem('goals');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('goals', JSON.stringify(DEFAULT_GOALS));
  return DEFAULT_GOALS;
}

export function addGoal(goalData) {
  const goals = getGoals();
  const newGoal = {
    ...goalData,
    id: Date.now(),
    current: 0
  };
  const newGoals = [...goals, newGoal];
  localStorage.setItem('goals', JSON.stringify(newGoals));
  window.dispatchEvent(new Event('goals_updated'));
  return newGoals;
}

export function addFundsToGoal(goalId, amount) {
  const goals = getGoals();
  const index = goals.findIndex(g => g.id === goalId);
  if (index !== -1) {
    goals[index].current += parseFloat(amount);
    localStorage.setItem('goals', JSON.stringify(goals));
    window.dispatchEvent(new Event('goals_updated'));

    addTransaction({
      title: `Funded ${goals[index].title}`,
      amount: -Math.abs(amount),
      category: 'Saving',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  }
  return goals;
}

export function removeGoal(goalId) {
  const goals = getGoals();
  const newGoals = goals.filter(g => g.id !== goalId);
  localStorage.setItem('goals', JSON.stringify(newGoals));
  window.dispatchEvent(new Event('goals_updated'));
  return newGoals;
}
