import React from 'react';

const CategoryTab = ({ name, color, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left rounded-lg transition-colors ${
        isActive 
          ? 'bg-green-100 text-green-800 font-medium' 
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${
          color === 'green' ? 'bg-green-500' :
          color === 'red' ? 'bg-red-500' :
          'bg-blue-500'
        }`}></div>
        <span className="text-sm">{name}</span>
      </div>
    </button>
  );
};

export default CategoryTab; 