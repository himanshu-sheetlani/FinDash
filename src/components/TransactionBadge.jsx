import React from 'react';

export const getStatusColor = (status) => {
  switch (status) {
    case 'Essentials': return 'text-blue-400 border-blue-900/50 bg-blue-900/20'; 
    case 'Recieved': return 'text-green-400 border-green-900/50 bg-green-900/20';
    case 'Wants': return 'text-pink-400 border-pink-900/50 bg-pink-900/20';
    case 'Saving': return 'text-yellow-400 border-yellow-900/50 bg-yellow-900/20';
    case 'Dept': return 'text-red-400 border-red-900/50 bg-red-900/20';
    case 'Learning': return 'text-purple-400 border-purple-900/50 bg-purple-900/20';
    // case 'Hardware': return 'text-blue-400 border-blue-900/50 bg-blue-900/20';
    // case 'Revenue': return 'text-green-400 border-green-900/50 bg-green-900/20';
    // case 'Health': return 'text-emerald-400 border-emerald-900/50 bg-emerald-900/20';
    // case 'Infrastructure': return 'text-purple-400 border-purple-900/50 bg-purple-900/20';
    // case 'Transport': return 'text-amber-400 border-amber-900/50 bg-amber-900/20';
    default: return 'text-gray-400 border-gray-700 bg-gray-800';
  }
};

function TransactionBadge({ status }) {
  return (
    <span className={`inline-flex px-2 py-0.5 border text-[10px] font-medium rounded-full ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

export default TransactionBadge;
