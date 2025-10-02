import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { BackIcon, ReceiptIcon } from './Icons';
import { fetchOrderHistory } from '../services/orderService';

interface OrderHistoryProps {
    userId: number;
    onBack: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ userId, onBack }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrderHistory = async () => {
            try {
                setError(null);
                setIsLoading(true);
                const userOrders = await fetchOrderHistory(userId);
                // Sort orders by date, newest first
                userOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setOrders(userOrders);
            } catch (err) {
                setError('Failed to load order history. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadOrderHistory();
    }, [userId]);

    const renderSkeleton = () => (
        <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    </div>
                    <div className="border-t my-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    </div>
                    <div className="text-right mt-4">
                        <div className="h-8 bg-slate-200 rounded w-1/3 ml-auto"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        if (isLoading) {
            return renderSkeleton();
        }
        if (error) {
             return (
                <div className="text-center bg-white p-12 rounded-lg shadow-md border border-red-200">
                    <h2 className="text-2xl font-serif text-red-700">An Error Occurred</h2>
                    <p className="text-slate-500 mt-2">{error}</p>
                </div>
            );
        }
        if (orders.length === 0) {
             return (
                <div className="text-center bg-white p-12 rounded-lg shadow-md">
                    <h2 className="text-2xl font-serif text-slate-700">No Orders Yet</h2>
                    <p className="text-slate-500 mt-2">You haven't placed any orders with us. Let's find something beautiful!</p>
                </div>
            );
        }
        return (
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex flex-wrap justify-between items-baseline mb-4 gap-2">
                            <h2 className="text-xl font-serif font-bold text-slate-800">Order #{order.id.substring(order.id.length-8)}</h2>
                            <p className="text-sm text-slate-500 font-medium">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div className="border-t -mx-6"></div>
                        <div className="py-4 space-y-3">
                            {order.items.map(item => (
                                <div key={item.productId} className="flex justify-between items-center text-sm">
                                    <p className="text-slate-700">
                                        <span className="font-bold">{item.quantity} x</span> {item.productName}
                                    </p>
                                    <p className="text-slate-500">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t -mx-6"></div>
                        <div className="text-right pt-4">
                            <span className="text-slate-600 font-medium">Total: </span>
                            <span className="text-xl font-bold text-emerald-700">${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-emerald-700 font-medium mb-8 hover:underline">
                <BackIcon className="w-5 h-5"/>
                Back to Shop
            </button>
            <div className="flex items-center gap-4 mb-8">
                <ReceiptIcon className="w-10 h-10 text-emerald-800"/>
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900">My Orders</h1>
                    <p className="text-slate-500">Here's a list of your past purchases.</p>
                </div>
            </div>
            {renderContent()}
        </div>
    );
};
