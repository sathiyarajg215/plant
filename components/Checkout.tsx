
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCardIcon, MailIcon, MapPinIcon, PhoneIcon, UserIcon } from './Icons';

interface CheckoutProps {
    onOrderPlaced: () => void;
    onCancel: () => void;
}

const paymentLogos = {
    gpay: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png',
    phonepe: 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg',
    paytm: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/1200px-Paytm_Logo_%28standalone%29.svg.png'
};

export const Checkout: React.FC<CheckoutProps> = ({ onOrderPlaced, onCancel }) => {
    const { cartItems, totalPrice, itemCount } = useCart();
    const [step, setStep] = useState<'details' | 'payment'>('details');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: ''
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateDetails = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.name) newErrors.name = 'Full name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'A valid email is required';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'A valid 10-digit phone number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.zip || !/^\d{5,6}$/.test(formData.zip)) newErrors.zip = 'A valid postal code is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateDetails()) {
            setStep('payment');
        }
    };
    
    const handlePlaceOrder = () => {
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }
        setIsProcessing(true);
        setTimeout(() => {
            onOrderPlaced();
        }, 2000); // Simulate network delay
    };

    const renderDetailsForm = () => (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6">Shipping Details</h3>
            <InputField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} icon={<UserIcon className="w-5 h-5"/>} autoComplete="name" />
            <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} icon={<MailIcon className="w-5 h-5"/>} autoComplete="email" />
            <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} error={errors.phone} icon={<PhoneIcon className="w-5 h-5"/>} autoComplete="tel" />
            <InputField label="Street Address" name="address" value={formData.address} onChange={handleInputChange} error={errors.address} icon={<MapPinIcon className="w-5 h-5"/>} autoComplete="street-address" />
            <div className="grid grid-cols-2 gap-4">
                <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} error={errors.city} autoComplete="address-level2" />
                <InputField label="Postal Code" name="zip" value={formData.zip} onChange={handleInputChange} error={errors.zip} autoComplete="postal-code"/>
            </div>
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md mt-4">
                Continue to Payment
            </button>
        </form>
    );

    const renderPayment = () => (
        <div>
            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6">Payment Method</h3>
            <div className="space-y-4">
                {Object.entries(paymentLogos).map(([key, src]) => (
                    <PaymentOption key={key} id={key} selected={paymentMethod === key} onSelect={setPaymentMethod}>
                        <img src={src} alt={`${key} logo`} className="h-6" />
                    </PaymentOption>
                ))}
                 <PaymentOption id="card" selected={paymentMethod === 'card'} onSelect={setPaymentMethod}>
                    <div className="flex items-center gap-3">
                        <CreditCardIcon className="w-6 h-6"/>
                        <span className="font-medium">Credit / Debit Card</span>
                    </div>
                </PaymentOption>
                 {paymentMethod === 'card' && (
                    <div className="p-4 border rounded-lg bg-slate-50 space-y-3 mt-2">
                        <InputField label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" autoComplete="cc-number"/>
                        <div className="grid grid-cols-2 gap-4">
                             <InputField label="Expiry Date" name="expiry" placeholder="MM/YY" autoComplete="cc-exp" />
                             <InputField label="CVV" name="cvv" placeholder="123" autoComplete="cc-csc" />
                        </div>
                    </div>
                )}
            </div>
            <button onClick={handlePlaceOrder} disabled={isProcessing} className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md mt-8 disabled:bg-slate-400 disabled:cursor-not-allowed">
                {isProcessing ? (
                     <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                    </div>
                ) : `Pay $${totalPrice.toFixed(2)}`}
            </button>
            <button onClick={() => setStep('details')} className="w-full text-center text-slate-600 font-medium mt-4 hover:text-emerald-700">
                Back to Details
            </button>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900 mb-2">Checkout</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">Complete your order by providing your details below.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    {step === 'details' ? renderDetailsForm() : renderPayment()}
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md h-fit md:sticky top-28">
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6 border-b pb-4">Order Summary</h3>
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                    <div>
                                        <p className="font-medium text-slate-700">{item.name}</p>
                                        <p className="text-slate-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                     <div className="mt-6 border-t pt-6 space-y-3">
                        <div className="flex justify-between font-medium">
                            <span className="text-slate-600">Subtotal ({itemCount} items)</span>
                            <span className="text-slate-800">${totalPrice.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between font-medium">
                            <span className="text-slate-600">Shipping</span>
                            <span className="text-emerald-600">FREE</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl">
                            <span className="text-slate-800">Total</span>
                            <span className="text-emerald-700">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; icon?: React.ReactNode }> = ({ label, name, error, icon, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <div className="relative">
             {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
            <input id={name} name={name} {...props} className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:ring-emerald-500'}`} />
        </div>
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
);

const PaymentOption: React.FC<{id: string, selected: boolean, onSelect: (id: string) => void, children: React.ReactNode}> = ({id, selected, onSelect, children}) => (
    <div onClick={() => onSelect(id)} className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${selected ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}>
        {children}
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-emerald-500' : 'border-slate-300'}`}>
            {selected && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
        </div>
    </div>
);
