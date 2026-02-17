import React from 'react';
import Button from './ui/Button';

const Hero = ({ onCtaClick, title }) => {
    return (
        <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl animate-fade-in group">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Hero Food"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 px-8 py-20 sm:px-12 sm:py-32 max-w-2xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-primary-300 font-semibold text-sm mb-6">
                    ✨ AI-Powered Cooking Assistant
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
                    {title || (
                        <>
                            Unlock the Secret <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-yellow-400">
                                of Every Dish
                            </span>
                        </>
                    )}
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed font-light">
                    Snap a photo of your food and let our AI chef identify it, suggest recipes, and calculate nutrition instantly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="shadow-orange-glow" onClick={onCtaClick}>
                        Start Detecting
                    </Button>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-dark-900 shadow-none">
                        Explore Recipes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
