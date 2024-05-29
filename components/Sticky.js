import React from 'react';

const Sticky = ({ onClose, onSortChange, onFilterChange }) => {
  return (
    <div className="sticky top-16 bg-gray-800 p-4 z-10 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <select
          className="bg-gray-700 text-white rounded py-1 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          onChange={e => onSortChange(e.target.value)}
        >
          <option value="new">New</option>
          <option value="points">Points</option>
        </select>
        <select
          className="bg-gray-700 text-white rounded py-1 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          onChange={e => onFilterChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="trippy 420">Trippy 420</option>
          <option value="american pride">American Pride</option>
          <option value="realistic">Realistic</option>
          <option value="vintage vibes">Vintage Vibes</option>
          <option value="futuristic tech">Futuristic Tech</option>
          <option value="dreamy pastel">Dreamy Pastel</option>
          <option value="dark noir">Dark Noir</option>
          <option value="pop art">Pop Art</option>
          <option value="minimalist zen">Minimalist Zen</option>
        </select>
      </div>
      <button
        onClick={onClose}
        className="px-2 py-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all text-sm"
      >
        Close
      </button>
    </div>
  );
};

export default Sticky;
