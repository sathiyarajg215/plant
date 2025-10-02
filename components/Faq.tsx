import React, { useState } from 'react';
import { BackIcon, HelpCircleIcon, ChevronDownIcon } from './Icons';

interface FaqProps {
    onBack: () => void;
}

const faqData = [
    {
        question: "How do I care for my new plant?",
        answer: "Each plant has unique needs! For our indoor and outdoor plants, we provide an AI-powered Plant Care Guide on the product detail page. This guide covers light, water, soil, and fertilizer recommendations specific to your plant."
    },
    {
        question: "What is your shipping policy?",
        answer: "We ship nationwide. Standard shipping takes 3-5 business days. We take great care in packaging our plants to ensure they arrive safely. For more details, please visit our Shipping & Returns page."
    },
    {
        question: "Can I return a plant if I'm not satisfied?",
        answer: "Yes, we have a 14-day return policy for most items. If your plant arrives damaged or you're not happy with it, please contact our customer service team with a photo, and we'll be happy to assist you with a return or replacement."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order has shipped, you will receive an email with a tracking number. You can use this number to track your package's journey to your home."
    },
    {
        question: "Do you offer gift wrapping or personalized messages?",
        answer: "Currently, we do not offer specific gift-wrapping services. However, you can add a personalized message to your order during the checkout process, which we will include on the packing slip."
    }
];

const FaqItem: React.FC<{ item: typeof faqData[0]; isOpen: boolean; onClick: () => void; }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-200">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4 px-2"
            >
                <span className="font-serif font-semibold text-slate-800 text-lg">{item.question}</span>
                <ChevronDownIcon className={`w-6 h-6 text-emerald-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-4 px-2 text-slate-600">
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    );
};

export const Faq: React.FC<FaqProps> = ({ onBack }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-emerald-700 font-medium mb-8 hover:underline">
                <BackIcon className="w-5 h-5"/>
                Back to Shop
            </button>
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-md">
                <div className="text-center mb-10">
                    <HelpCircleIcon className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900">Frequently Asked Questions</h1>
                    <p className="text-slate-500 mt-2 max-w-2xl mx-auto">Find answers to common questions about our products and services.</p>
                </div>

                <div className="space-y-2">
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
