import React from 'react';
import Card, { CardBody } from './Card'; // Removed unused CardImage import
import Button from './Button';

const RecipeCard = ({ title, image, calories, tags, time, author }) => {
    return (
        <Card className="h-full flex flex-col group cursor-pointer border-transparent hover:border-primary-100 ring-0 hover:ring-2 hover:ring-primary-50 transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-white/90 backdrop-blur-sm text-dark-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="absolute bottom-4 right-4">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        🔥 {calories} kcal
                    </span>
                </div>
            </div>

            <CardBody className="flex-1 flex flex-col p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-display font-bold text-dark-900 leading-tight group-hover:text-primary-600 transition-colors">
                        {title}
                    </h3>
                </div>

                <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {time}
                    </div>
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {author}
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <img key={i} className="w-6 h-6 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                        ))}
                        <span className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-medium">+8</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 p-0 px-2 h-8">
                        View Recipe →
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default RecipeCard;
