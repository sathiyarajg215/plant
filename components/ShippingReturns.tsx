import React from 'react';
import { BackIcon, TruckIcon } from './Icons';

interface ShippingReturnsProps {
    onBack: () => void;
}

export const ShippingReturns: React.FC<ShippingReturnsProps> = ({ onBack }) => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-emerald-700 font-medium mb-8 hover:underline">
                <BackIcon className="w-5 h-5"/>
                Back to Shop
            </button>
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-md">
                <div className="text-center mb-10">
                    <TruckIcon className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900">Shipping & Returns</h1>
                    <p className="text-slate-500 mt-2 max-w-2xl mx-auto">Everything you need to know about how we get our plants to you.</p>
                </div>

                <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-8">
                    <div>
                        <h2 className="font-serif font-bold text-2xl text-emerald-800">Shipping Policy</h2>
                        <p>
                            We are committed to delivering our beautiful plants to your doorstep in perfect condition. All orders are processed within 1-2 business days. We ship Monday through Wednesday to avoid having plants sit in a warehouse over the weekend.
                        </p>
                        <ul>
                            <li><strong>Standard Shipping (3-5 Business Days):</strong> A flat rate of $9.95. Free for orders over $100.</li>
                            <li><strong>Express Shipping (1-2 Business Days):</strong> Available for $24.95.</li>
                            <li><strong>Packaging:</strong> Each plant is carefully secured in custom-designed packaging to ensure it remains safe and healthy during transit.</li>
                        </ul>
                         <p>
                           You will receive a shipping confirmation email with a tracking number as soon as your order leaves our greenhouse.
                        </p>
                    </div>

                    <div className="border-t pt-8">
                        <h2 className="font-serif font-bold text-2xl text-emerald-800">Return Policy</h2>
                        <p>
                            Your satisfaction is our top priority. If you are not completely happy with your purchase, we're here to help.
                        </p>
                        <p>
                            We offer a <strong>14-day happiness guarantee</strong> on all our plants. If your plant arrives damaged or in poor condition, please contact us at <a href="mailto:support@floraandform.com">support@floraandform.com</a> within 14 days of delivery with a photo of the issue. We will gladly send you a replacement or issue a full refund.
                        </p>
                        <p>
                           For non-plant items like pots and accessories, you may return them within 30 days for a full refund, provided they are in unused condition. Please note that return shipping costs are the responsibility of the customer for non-damaged goods.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
