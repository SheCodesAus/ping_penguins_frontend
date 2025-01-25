import React from 'react';

const StatCard = ({ title, value, icon, bgColor }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'plus':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        );
      case 'users':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        );
      case 'tag':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 bg-${bgColor}-100 rounded-full`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${bgColor}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {getIcon(icon)}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatCard; 