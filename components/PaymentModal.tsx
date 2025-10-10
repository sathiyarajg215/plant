import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalPrice: number;
    onConfirm: () => Promise<void>;
}

// NOTE: Replace this with your actual VPA (Virtual Payment Address) from your payment provider.
const VPA = 'store@okcommerce'; 
const STORE_NAME = 'Flora & Form';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, totalPrice, onConfirm }) => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        if (isOpen) {
            // This creates a standard UPI payment link that generates a QR code.
            // In a real application, you would get this data from your payment gateway's API.
            const transactionId = `FF${Date.now()}`;
            const upiString = `upi://pay?pa=${VPA}&pn=${encodeURIComponent(STORE_NAME)}&am=${totalPrice.toFixed(2)}&cu=INR&tid=${transactionId}`;
            
            // We use a free, public API to generate the QR code image from the UPI string.
            const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(upiString)}`;
            setQrCodeUrl(qrApiUrl);
            setIsVerifying(false);
        }
    }, [isOpen, totalPrice]);

    const handleConfirmPayment = async () => {
        setIsVerifying(true);
        // This timeout simulates the time it takes for the payment gateway to confirm the transaction.
        // In a real app, the backend would receive a webhook from the gateway, and the frontend would poll for a status update.
        setTimeout(async () => {
            await onConfirm();
            // The modal is closed by the parent component after confirmation.
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm text-center relative transform transition-all animate-slide-up">
                <button onClick={onClose} disabled={isVerifying} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 disabled:opacity-50 text-2xl font-bold">&times;</button>
                <h2 className="text-2xl font-serif font-bold text-emerald-800 mb-2">Scan to Pay</h2>
                <p className="text-slate-500 mb-4">Use any UPI app like GPay, PhonePe, or Paytm.</p>
                
                <div className="p-4 bg-slate-100 rounded-lg inline-block my-4">
                    {qrCodeUrl ? (
                        <img src={qrCodeUrl} alt="UPI QR Code" width="220" height="220" />
                    ) : (
                        <div className="w-[220px] h-[220px] bg-slate-200 rounded-lg flex items-center justify-center animate-pulse">
                            <p className="text-slate-500">Loading QR Code...</p>
                        </div>
                    )}
                </div>
                
                <div className="my-4">
                    <p className="text-sm text-slate-600">Amount to Pay</p>
                    <p className="text-3xl font-bold text-slate-800">${totalPrice.toFixed(2)}</p>
                </div>
                
                <button 
                    onClick={handleConfirmPayment}
                    disabled={isVerifying}
                    className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isVerifying ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Verifying Payment...</span>
                        </>
                    ) : (
                        'I Have Paid'
                    )}
                </button>
                <p className="text-xs text-slate-400 mt-4">This is a simulated payment process.</p>
            </div>
             <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
            `}</style>
        </div>
    );
};
