import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-dark-800">
            <Navbar />
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="animate-fade-in">
                    {children}
                </div>
            </main>
            <footer className="border-t border-gray-200 bg-white py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-dark-400 text-sm">
                    &copy; {new Date().getFullYear()} RecipeAI. Crafted with spicy creativity.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
