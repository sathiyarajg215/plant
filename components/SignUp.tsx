import React, { useState } from 'react';
import { LeafIcon, MailIcon, UserIcon, KeyIcon, GoogleIcon, FacebookIcon } from './Icons';

interface SignUpProps {
    onSignUp: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
    onSocialSignUp: (provider: 'Google' | 'Facebook') => void;
    onNavigateToLogin: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSocialSignUp, onNavigateToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }
        setError('');
        setIsLoading(true);
        const result = await onSignUp(name, email, password);
        if (!result.success) {
            setError(result.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }} className="flex items-center justify-center gap-2 text-3xl font-serif font-bold text-emerald-800">
                        <LeafIcon className="w-8 h-8" />
                        Flora & Form
                    </a>
                    <p className="text-slate-500 mt-2">Create a new account to start shopping.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                             <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                   <UserIcon className="w-5 h-5"/>
                               </div>
                               <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                    placeholder="Jane Doe"
                                />
                            </div>
                        </div>
                        <div>
                             <label htmlFor="email-signup" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                   <MailIcon className="w-5 h-5"/>
                               </div>
                               <input
                                    id="email-signup"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                         <div>
                             <label htmlFor="password-signup" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                             <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                   <KeyIcon className="w-5 h-5"/>
                               </div>
                                <input
                                    id="password-signup"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <div>
                             <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                             <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                   <KeyIcon className="w-5 h-5"/>
                               </div>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                               {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-slate-500">OR</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onClick={() => onSocialSignUp('Google')} className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                           <GoogleIcon className="w-5 h-5" />
                           <span className="text-sm font-medium text-slate-700">Sign up with Google</span>
                        </button>
                        <button onClick={() => onSocialSignUp('Facebook')} className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                           <FacebookIcon className="w-5 h-5 text-[#1877F2]" />
                           <span className="text-sm font-medium text-slate-700">Sign up with Facebook</span>
                        </button>
                    </div>

                     <p className="text-center text-sm text-slate-500 mt-6">
                        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }} className="font-medium text-emerald-600 hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};