// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-2 w-full fixed bottom-0 flex items-center justify-center">
            <div className="flex items-center">
                <div className="text-lg md:text-xl lg:text-2xl font-bold">
                    Developed By
                </div>
                <div className="text-2xl md:text-4xl lg:text-3xl font-extrabold ml-2 relative inline-block">
                    <span className="relative z-10 text-white animate-pulse">
                        SP Kango
                    </span>
                    {/* Remove this span to avoid background shading */}
                    {/* <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-600 opacity-30 rounded-lg"></span> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
