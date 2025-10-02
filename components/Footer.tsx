
import React from 'react';
import { LeafIcon } from './Icons';

export const Footer: React.FC = () => {
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
                            <li><a href="#" className="hover:text-white">Our Story</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">FAQ</a></li>
                            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-emerald-800 pt-8 text-center text-sm text-emerald-400">
                    <p>&copy; {new Date().getFullYear()} Flora & Form. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
