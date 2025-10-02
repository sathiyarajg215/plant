import React, { useState } from 'react';
import { LeafIcon, MailIcon, KeyIcon, GoogleIcon, FacebookIcon } from './Icons';

interface LoginProps {
    onLogin: (email: string, password: string) => Promise<boolean>;
    onSocialLogin: (provider: 'Google' | 'Facebook') => void;
    onNavigateToSignUp: () => void;
    onNavigateToForgotPassword: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSocialLogin, onNavigateToSignUp, onNavigateToForgotPassword }) => {
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const success = await onLogin(email, password);
        if (!success) {
            setError('Invalid email or password. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center gap-2 text-3xl font-serif font-bold text-emerald-800">
                        <LeafIcon className="w-8 h-8" />
                        Flora & Form
                    </a>
                    <p className="text-slate-500 mt-2">Welcome back! Please sign in to your account.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                             <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                   <MailIcon className="w-5 h-5"/>
                               </div>
                               <input
                                    id="email"
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
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password-login" className="block text-sm font-medium text-slate-700">Password</label>
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToForgotPassword(); }} className="text-sm font-medium text-emerald-600 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                             <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                   <KeyIcon className="w-5 h-5"/>
                               </div>
                                <input
                                    id="password-login"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    'Sign In'
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
                        <button onClick={() => onSocialLogin('Google')} className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                           <GoogleIcon className="w-5 h-5" />
                           <span className="text-sm font-medium text-slate-700">Sign in with Google</span>
                        </button>
                        <button onClick={() => onSocialLogin('Facebook')} className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                           <FacebookIcon className="w-5 h-5 text-[#1877F2]" />
                           <span className="text-sm font-medium text-slate-700">Sign in with Facebook</span>
                        </button>
                    </div>

                     <p className="text-center text-sm text-slate-500 mt-6">
                        Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToSignUp(); }} className="font-medium text-emerald-600 hover:underline">Sign up</a>
                    </p>
                </div>
                 <div className="text-center mt-4">
                    <p className="text-xs text-slate-500">Demo account: <strong>user@example.com</strong> / <strong>password123</strong></p>
                </div>
            </div>
        </div>
    );
};