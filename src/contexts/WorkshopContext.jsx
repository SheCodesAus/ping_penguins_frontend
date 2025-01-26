import React, { createContext, useState, useContext } from 'react';

const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  const [workshopData, setWorkshopData] = useState({
    title: "Welcome to the workshop",
    categories: []
  });

  const updateWorkshop = (newTitle, categories) => {
    setWorkshopData(prev => ({
      ...prev,
      title: newTitle,
      categories: categories
    }));
  };

  return (
    <WorkshopContext.Provider value={{ workshopData, updateWorkshop }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within a WorkshopProvider');
  }
  return context;
}; 