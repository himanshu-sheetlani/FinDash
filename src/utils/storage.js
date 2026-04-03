const INITIAL_BALANCE = 10000;

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
    // Force reset dummy data if the user only has the original 10 short transactions
    if (parsed.length <= 11) {
      localStorage.setItem('transactions', JSON.stringify(DEFAULT_TRANSACTIONS));
      return DEFAULT_TRANSACTIONS;
    }
    return parsed;
  }
  localStorage.setItem('transactions', JSON.stringify(DEFAULT_TRANSACTIONS));
  return DEFAULT_TRANSACTIONS;
}

export function addTransaction(transaction) {
  const transactions = getTransactions();
  const newTx = {
    ...transaction,
    id: Date.now()
  };
  const newTransactions = [newTx, ...transactions];
  localStorage.setItem('transactions', JSON.stringify(newTransactions));
  // dispatch custom event for cross-component reactivity
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
