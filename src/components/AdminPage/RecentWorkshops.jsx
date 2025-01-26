import React from 'react';

const RecentWorkshops = ({ workshops }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Recent Workshops</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workshops.length > 0 ? (
          workshops.map((workshop, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold">{workshop.title}</h3>
              <p className="text-sm text-gray-600">Date and Time: {new Date(workshop.dateTime).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Categories: {workshop.categories.join(', ')}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No workshops created yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecentWorkshops; 