import 'react';

const StickyNote = ({ text, author, bgColor }) => {
  return (
    <div className={`bg-${bgColor}-50 p-4 shadow-md transform hover:-translate-y-1 transition-transform cursor-pointer`}>
      <p className="text-gray-800 mb-3">{text}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
};

export default StickyNote; 