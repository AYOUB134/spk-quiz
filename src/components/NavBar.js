// src/components/NavBar.js
import React from 'react';
import logo from './logo.jpg'; // Adjust the path if needed

const NavBar = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-center shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex items-center">
            <img 
                src={logo} 
                alt="College Logo" 
                className="h-12 w-auto rounded-full border-4 border-white transform transition-transform duration-300 hover:scale-110" 
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold ml-4 whitespace-nowrap">
                Shaheed Benazir Bhutto Girls Cadet College Larkana
            </h1>
        </div>
    </nav>
);

export default NavBar;
