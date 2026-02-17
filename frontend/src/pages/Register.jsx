import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../components/FormInput';
import Button from '../components/ui/Button';
import { getErrorMessage } from '../utils/apiUtils';

// Password Strength Component
const PasswordStrength = ({ password }) => {
    const getStrength = (pass) => {
        let score = 0;
        if (!pass) return 0;
        if (pass.length > 6) score++;
        if (pass.length > 10) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getStrength(password);
    const colors = ['bg-gray-200', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-600'];
    const labels = ['None', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];

    return (
        <div className="mt-2 space-y-1">
            <div className="flex gap-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={`h-full w-1/5 transition-colors duration-300 ${strength >= level ? colors[strength] : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>
            <p className={`text-xs text-right font-medium ${strength > 0 ? 'text-dark-600' : 'text-gray-400'}`}>
                {labels[strength]}
            </p>
        </div>
    );
};

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear specific error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setGeneralError('');

        try {
            await axios.post('http://127.0.0.1:8000/register', formData);
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000); // Redirect to login
        } catch (err) {
            setGeneralError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left: Hero Image (Desktop only) */}
            <div className="hidden lg:flex w-1/2 relative bg-dark-900">
                <img
                    src="https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                    alt="Food Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end p-16 text-white">
                    <h1 className="text-5xl font-display font-bold mb-6 leading-tight">
                        Discover the Art <br /> of Cooking
                    </h1>
                    <p className="text-xl text-gray-300 max-w-lg">
                        Join thousands of foodies using AI to uncover the secrets behind every dish.
                    </p>
                </div>
            </div>

            {/* Right: Register Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
                {/* Background decorative blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <Link to="/home" className="inline-block text-2xl font-display font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent mb-2">
                                RecipeAI
                            </Link>
                            <h2 className="text-2xl font-bold text-dark-900">Create Account</h2>
                            <p className="text-dark-500 mt-2">Sign up to get started</p>
                        </div>

                        {generalError && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                                {String(generalError)}
                            </div>
                        )}

                        {success ? (
                            <div className="text-center py-12 animate-fade-in">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-dark-900 mb-2">Account Created!</h3>
                                <p className="text-dark-500">Redirecting to login...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormInput
                                    label="Full Name"
                                    floatingLabel
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />

                                <FormInput
                                    label="Email Address"
                                    floatingLabel
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <div className="relative">
                                    <FormInput
                                        label="Password"
                                        floatingLabel
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                    {!errors.password && <PasswordStrength password={formData.password} />}
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full justify-center shadow-primary-500/25 hover:shadow-primary-500/40"
                                        size="lg"
                                        isLoading={loading}
                                    >
                                        Create Account
                                    </Button>
                                </div>
                            </form>
                        )}

                        <div className="mt-8 text-center">
                            <p className="text-dark-500 text-sm">
                                Already have an account?{' '}
                                <Link to="/" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
