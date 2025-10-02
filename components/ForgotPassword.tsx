import React, { useState } from 'react';
import { LeafIcon, MailIcon } from './Icons';

interface ForgotPasswordProps {
    onForgotPasswordRequest: (email: string) => Promise<void>;
    onNavigateToLogin: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onForgotPasswordRequest, onNavigateToLogin }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await onForgotPasswordRequest(email);
        setIsLoading(false);
        setMessageSent(true);
    };

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }} className="flex items-center justify-center gap-2 text-3xl font-serif font-bold text-emerald-800">
                        <LeafIcon className="w-8 h-8" />
                        Flora & Form
                    </a>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    {messageSent ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Check your email</h2>
                            <p className="text-slate-600 mb-6">If an account with that email exists, we've sent instructions to reset your password.</p>
                            <a 
                                href="#"
                                onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }}
                                className="font-medium text-emerald-600 hover:underline"
                            >
                                Back to Sign In
                            </a>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-serif font-bold text-slate-800">Forgot Password?</h2>
                                <p className="text-slate-500 mt-2">No problem. Enter your email address and we'll send you a reset link.</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email-forgot" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <MailIcon className="w-5 h-5"/>
                                    </div>
                                    <input
                                            id="email-forgot"
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
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                    {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            'Send Reset Link'
                                        )}
                                    </button>
                                </div>
                            </form>
                            <p className="text-center text-sm text-slate-500 mt-6">
                                Remember your password? <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }} className="font-medium text-emerald-600 hover:underline">Sign in</a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};