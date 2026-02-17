import React from 'react';

const CategoryGrid = ({ categories }) => {
    return (
        <div className="mb-16">
            <div className="flex justify-between items-end mb-6 px-2">
                <div>
                    <h2 className="text-2xl font-display font-bold text-dark-900">Browse by Cuisine</h2>
                    <p className="text-dark-500 mt-1">Authentic tastes from around the world</p>
                </div>
                <a href="#" className="text-primary-600 font-medium hover:text-primary-700 hidden sm:block">View All →</a>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {categories.map((cat, idx) => (
                    <div key={idx} className="flex-shrink-0 w-32 sm:w-40 flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl ${cat.color} group-hover:scale-110 transition-transform`}>
                            {cat.icon}
                        </div>
                        <span className="font-semibold text-dark-800 text-sm">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;
