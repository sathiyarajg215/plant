
import React, { useState } from 'react';
import { BackIcon, MailIcon, PhoneIcon, MapPinIcon, MessageSquareIcon, UserIcon } from './Icons';
import { sendContactMessage } from '../services/emailService';

interface ContactUsProps {
    onBack: () => void;
    adminEmail: string;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onBack, adminEmail }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        setIsLoading(true);
        const success = await sendContactMessage(name, email, message, adminEmail);
        setIsLoading(false);
        if (success) {
            setIsSent(true);
        } else {
            setError('There was an error sending your message. Please try again later.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-emerald-700 font-medium mb-8 hover:underline">
                <BackIcon className="w-5 h-5"/>
                Back to Shop
            </button>
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-md">
                <div className="text-center mb-12">
                    <MessageSquareIcon className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900">Get In Touch</h1>
                    <p className="text-slate-500 mt-2 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our plants, your order, or anything else, our team is ready to answer all your questions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                         <h2 className="text-2xl font-serif font-bold text-slate-800">Contact Information</h2>
                         <p className="text-slate-600">Fill up the form and our team will get back to you within 24 hours.</p>
                         <div className="space-y-4">
                             <a href="tel:+1234567890" className="flex items-center gap-4 text-slate-700 hover:text-emerald-600 transition-colors">
                                <PhoneIcon className="w-5 h-5 text-emerald-500" />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <a href="mailto:hello@floraandform.com" className="flex items-center gap-4 text-slate-700 hover:text-emerald-600 transition-colors">
                                <MailIcon className="w-5 h-5 text-emerald-500" />
                                <span>hello@floraandform.com</span>
                            </a>
                             <div className="flex items-center gap-4 text-slate-700">
                                <MapPinIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <span>123 Greenery Lane, Plantville, PL 45678</span>
                            </div>
                         </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div>
                         {isSent ? (
                            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg h-full flex flex-col justify-center text-center">
                                <h3 className="text-xl font-serif font-bold text-emerald-800">Message Sent!</h3>
                                <p className="text-emerald-700 mt-2">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><UserIcon className="w-5 h-5"/></div>
                                        <input type="text" id="contact-name" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="John Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><MailIcon className="w-5 h-5"/></div>
                                        <input type="email" id="contact-email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                    <textarea id="contact-message" value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="How can we help you today?"></textarea>
                                </div>
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <div>
                                    <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
