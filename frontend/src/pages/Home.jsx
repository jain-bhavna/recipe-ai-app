import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Use custom axios instance with interceptor
import { getErrorMessage } from '../utils/apiUtils';
// Using standard absolute paths or relative to structure
import Layout from '../components/Layout';
// Using the new components
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import UploadCard from '../components/UploadCard';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // User Authentication State
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const fileInputRef = useRef(null);
    const resultsRef = useRef(null);
    const navigate = useNavigate();

    // Fetch User Data on Mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/me');
                setUser(res.data);
            } catch (err) {
                console.error("Auth Error:", err);
                // Redirect to login if unauthorized
                navigate('/');
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, [navigate]);

    // Static Data for UI Demo (as per design reqs)
    const cuisineCategories = [
        { name: 'Italian', icon: '🍝', color: 'bg-red-100 text-red-600' },
        { name: 'Asian', icon: '🍜', color: 'bg-orange-100 text-orange-600' },
        { name: 'Mexican', icon: '🌮', color: 'bg-green-100 text-green-600' },
        { name: 'American', icon: '🍔', color: 'bg-blue-100 text-blue-600' },
        { name: 'Healthy', icon: '🥗', color: 'bg-emerald-100 text-emerald-600' },
        { name: 'Desserts', icon: '🍰', color: 'bg-pink-100 text-pink-600' },
    ];

    const featuredRecipes = [
        { id: 1, title: 'Creamy Mushroom Risotto', calories: 450, time: '40m', tags: ['Italian', 'Vegetarian'], author: 'Chef Mario', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
        { id: 2, title: 'Spicy Basil Chicken', calories: 320, time: '25m', tags: ['Asian', 'Spicy'], author: 'Chef Li', image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
        { id: 3, title: 'Classic Beef Burger', calories: 850, time: '30m', tags: ['American', 'Bbq'], author: 'Chef John', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
        { id: 4, title: 'Avocado Toast', calories: 280, time: '10m', tags: ['Healthy', 'Breakfast'], author: 'Chef Sarah', image: 'https://images.unsplash.com/photo-1588137372308-15f75323a399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
    ];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            processFile(droppedFile);
        }
    };

    const processFile = (selectedFile) => {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setDish(null);
        setError(null);
    };

    const detectDish = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await api.post('/detect-dish', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setDish(res.data);
            // Scroll to results
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (err) {
            console.error(err);
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    if (loadingUser) {
        return (
            <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500 mb-4"></div>
                <h3 className="text-xl font-bold text-dark-800">Loading your kitchen...</h3>
            </div>
        );
    }

    return (
        <Layout>
            {/* 1. Hero Banner with User Greeting */}
            <Hero
                onCtaClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
                title={user ? (
                    <>
                        Welcome back, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-yellow-400">
                            {user.name}
                        </span>
                    </>
                ) : null}
            />

            {/* 2. Cuisine Categories */}
            <CategoryGrid categories={cuisineCategories} />

            {/* 3. Detect Dish Upload Section */}
            <UploadCard
                file={file}
                preview={preview}
                loading={loading}
                onFileChange={handleFileChange}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDetect={detectDish}
                onTriggerInput={triggerFileInput}
                onReplace={triggerFileInput}
                fileInputRef={fileInputRef}
            />

            {/* Loading & Error States */}
            {loading && (
                <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500 mb-4"></div>
                    <h3 className="text-xl font-bold text-dark-800">Analyzing flavors...</h3>
                    <p className="text-dark-500">Please wait while our AI tastes your photo.</p>
                </div>
            )}

            {error && (
                <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start">
                        <svg className="w-6 h-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <h4 className="font-bold text-red-800">Detection Failed</h4>
                            <p className="text-red-700">{String(error)}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. Results Section */}
            <div ref={resultsRef}>
                {dish && !loading && (
                    <div className="mb-24 animate-slide-up">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-2 bg-primary-500 rounded-full"></div>
                            <h2 className="text-3xl font-display font-bold text-dark-900">Detection Results</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            {/* Result Card */}
                            <Card className="overflow-hidden border-2 border-primary-100 shadow-2xl relative">
                                <div className="absolute top-0 right-0 p-4 z-10">
                                    <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                        98% Confidence
                                    </span>
                                </div>
                                <div className="h-64 bg-gray-100 relative">
                                    {/* If backend returned an image URL use it, otherwise use preview */}
                                    <img src={preview} alt="Detected" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="text-primary-300 font-bold tracking-wider uppercase text-sm mb-1">Identified Dish</p>
                                        <h3 className="text-4xl font-display font-bold">{dish.dish || dish}</h3>
                                    </div>
                                </div>
                                <CardBody className="p-8">
                                    <div className="prose text-dark-600">
                                        <p className="text-lg leading-relaxed">
                                            Great choice! This looks like a delicious serving of <strong>{dish.dish || dish}</strong>.
                                            Our AI has matched this with similar recipes in our database.
                                        </p>
                                    </div>

                                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                                        <div className="text-center">
                                            <span className="block text-2xl font-bold text-dark-900">450</span>
                                            <span className="text-xs text-dark-500 font-medium uppercase tracking-wider">Calories</span>
                                        </div>
                                        <div className="text-center border-l border-gray-100">
                                            <span className="block text-2xl font-bold text-dark-900">24g</span>
                                            <span className="text-xs text-dark-500 font-medium uppercase tracking-wider">Protein</span>
                                        </div>
                                        <div className="text-center border-l border-gray-100">
                                            <span className="block text-2xl font-bold text-dark-900">12g</span>
                                            <span className="text-xs text-dark-500 font-medium uppercase tracking-wider">Fat</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-3">
                                        <Button className="flex-1 justify-center">Get Recipe</Button>
                                        <Button variant="outline" className="flex-1 justify-center">Save to Diary</Button>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Related Recipes / Suggestions (Static placeholder for layout) */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-dark-900">Recommended Variations</h3>
                                {featuredRecipes.slice(0, 2).map(recipe => (
                                    <div key={recipe.id} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                        <img src={recipe.image} alt={recipe.title} className="w-24 h-24 rounded-xl object-cover" />
                                        <div className="flex-1 py-1">
                                            <h4 className="font-bold text-dark-900 mb-1">{recipe.title}</h4>
                                            <div className="flex gap-2 mb-2">
                                                {recipe.tags.slice(0, 2).map((t, i) => (
                                                    <span key={i} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-dark-600">{t}</span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-primary-600 font-medium">View Recipe →</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 5. Featured Recipes Grid */}
            <div className="mb-12">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-dark-900">Trending Now</h2>
                        <p className="text-dark-500 mt-1">Community favorites this week</p>
                    </div>
                    <Button variant="ghost" className="hidden sm:inline-flex">View All Recipes</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {featuredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} {...recipe} />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" className="w-full justify-center">View All Recipes</Button>
                </div>
            </div>

        </Layout>
    );
};

export default Home;
