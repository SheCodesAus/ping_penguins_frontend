import React from 'react';

const CategoryTab = ({ name, color, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 text-left rounded-lg ${
        isActive ? `bg-${color}-50 text-${color}-700` : 'text-gray-700'
      } font-medium hover:bg-${color}-100 transition-colors`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
        {name}
      </div>
    </button>
  );
};

export default CategoryTab; 