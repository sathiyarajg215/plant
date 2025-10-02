
import React from 'react';
import { CheckCircleIcon } from './Icons';

interface OrderConfirmationProps {
    onContinueShopping: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onContinueShopping }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <CheckCircleIcon className="w-24 h-24 text-emerald-500 mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900 mb-4">Thank You for Your Order!</h1>
            <p className="text-slate-600 max-w-lg mx-auto mb-8">
                Your order has been placed successfully. You will receive a confirmation email shortly.
                We appreciate your business!
            </p>
            <button 
                onClick={onContinueShopping}
                className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md"
            >
                Continue Shopping
            </button>
        </div>
    );
};
