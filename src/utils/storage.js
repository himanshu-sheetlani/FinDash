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
];

export function getTransactions() {
  const stored = localStorage.getItem('transactions');
  if (stored) {
    return JSON.parse(stored);
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
