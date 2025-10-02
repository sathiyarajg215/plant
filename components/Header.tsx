import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { LeafIcon, CartIcon, SearchIcon, LogOutIcon, UserCircleIcon, ReceiptIcon, ChevronDownIcon } from './Icons';
import { User } from '../types';

interface HeaderProps {
    onCartClick: () => void;
    onSearchChange: (term: string) => void;
    searchTerm: string;
    onLogoClick: () => void;
    user: User | null;
    onLogout: () => void;
    onNavigateToOrderHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
    onCartClick, 
    onSearchChange, 
    searchTerm, 
    onLogoClick, 
    user, 
    onLogout, 
    onNavigateToOrderHistory 
}) => {
    const { itemCount } = useCart();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOrderHistoryClick = () => {
        onNavigateToOrderHistory();
        setMenuOpen(false);
    }
    
    const handleLogoutClick = () => {
        onLogout();
        setMenuOpen(false);
    }

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 text-2xl font-serif font-bold text-emerald-800" onClick={(e) => { e.preventDefault(); onLogoClick(); }}>
                    <LeafIcon className="w-7 h-7" />
                    Flora & Form
                </a>
                <div className="hidden md:flex items-center w-full max-w-sm">
                   <div className="relative w-full">
                       <input 
                         type="text"
                         placeholder="Search for plants..."
                         value={searchTerm}
                         onChange={(e) => onSearchChange(e.target.value)}
                         className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                       />
                       <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                           <SearchIcon className="w-5 h-5"/>
                       </div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                     {user && (
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setMenuOpen(prev => !prev)} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50">
                                <UserCircleIcon className="w-6 h-6" />
                                <span className="hidden sm:inline font-medium">{user.name}</span>
                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                    <a href="#" onClick={(e) => {e.preventDefault(); handleOrderHistoryClick()}} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50">
                                        <ReceiptIcon className="w-5 h-5" />
                                        Order History
                                    </a>
                                    <a href="#" onClick={(e) => {e.preventDefault(); handleLogoutClick()}} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50">
                                        <LogOutIcon className="w-5 h-5" />
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                    <button onClick={onCartClick} className="relative text-slate-600 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50">
                        <CartIcon className="w-6 h-6" />
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};