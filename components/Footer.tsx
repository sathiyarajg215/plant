import React from 'react';
import { LeafIcon } from './Icons';

interface FooterProps {
    onNavigateToOurStory: () => void;
    onNavigateToContactUs: () => void;
    onNavigateToFaq: () => void;
    onNavigateToShipping: () => void;
    adminEmail: string;
    onAdminEmailChange: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToOurStory, onNavigateToContactUs, onNavigateToFaq, onNavigateToShipping, adminEmail, onAdminEmailChange }) => {
    return (
        <footer className="bg-emerald-900 text-emerald-200">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <a href="#" className="flex items-center gap-2 text-2xl font-serif font-bold text-white mb-4">
                            <LeafIcon className="w-7 h-7" />
                            Flora & Form
                        </a>
                        <p className="text-sm text-emerald-300">Bringing nature's artistry to your home and farm.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Indoor Plants</a></li>
                            <li><a href="#" className="hover:text-white">Outdoor Plants</a></li>
                            <li><a href="#" className="hover:text-white">Flowers</a></li>
                            <li><a href="#" className="hover:text-white">Seeds</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">About Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateToOurStory(); }} className="hover:text-white">Our Story</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateToContactUs(); }} className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateToFaq(); }} className="hover:text-white">FAQ</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateToShipping(); }} className="hover:text-white">Shipping & Returns</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-emerald-800 pt-8">
                    <h4 className="font-bold text-white mb-4">Admin Settings</h4>
                    <div className="max-w-md">
                        <label htmlFor="admin-email" className="block text-sm text-emerald-300 mb-2">Order Notification Email</label>
                        <input
                            type="email"
                            id="admin-email"
                            value={adminEmail}
                            onChange={(e) => onAdminEmailChange(e.target.value)}
                            className="w-full bg-emerald-800 border border-emerald-700 text-white rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none"
                            placeholder="sathiyarajg215@gmail.com"
                        />
                        <p className="text-xs text-emerald-400 mt-2">
                            This is where notifications for new orders will be sent. This demo uses console logs to simulate sending emails.
                        </p>
                    </div>
                </div>

                <div className="mt-12 border-t border-emerald-800 pt-8 text-center text-sm text-emerald-400">
                    <p>&copy; {new Date().getFullYear()} Flora & Form. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
