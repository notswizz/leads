import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-2 bg-gray-800 text-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-extrabold text-center">
          k<span className="text-pink-500">A</span>le<span className="text-pink-500">I</span>doscope
        </h1>
      </div>
    </header>
  );
};

export default Header;