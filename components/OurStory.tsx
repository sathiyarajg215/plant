import React from 'react';
import { BackIcon, LeafIcon } from './Icons';

interface OurStoryProps {
    onBack: () => void;
}

export const OurStory: React.FC<OurStoryProps> = ({ onBack }) => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-emerald-700 font-medium mb-8 hover:underline">
                <BackIcon className="w-5 h-5"/>
                Back to Shop
            </button>
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-md">
                <div className="text-center mb-10">
                    <LeafIcon className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900">Our Story</h1>
                    <p className="text-slate-500 mt-2 max-w-2xl mx-auto">From a small seed of an idea to a flourishing passion.</p>
                </div>

                <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                    <p>
                        Flora & Form was born from a simple belief: that nature holds the key to a more beautiful and serene life. It all started in a small backyard greenhouse, where our founder, a lifelong botanist and artist, began cultivating rare and unique plants. The goal wasn't just to grow plants, but to understand their forms, their needs, and the quiet artistry they bring into a space.
                    </p>
                    <figure className="my-8">
                        <img src="https://picsum.photos/seed/greenhouse/800/400" alt="A lush greenhouse filled with plants" className="w-full h-auto rounded-lg shadow-lg" />
                        <figcaption className="text-center text-sm text-slate-500 mt-2">Our very first greenhouse, where the journey began.</figcaption>
                    </figure>
                    <p>
                        What started as a hobby quickly grew. Friends and family were captivated by the health and beauty of the plants. They wanted to bring that same life into their own homes. We realized there was a desire not just for plants, but for a connection to the natural world.
                    </p>
                    <p>
                        Today, Flora & Form is a dedicated team of horticulturists, designers, and nature lovers. We meticulously source and care for every plant, from the grandest Monstera to the most delicate flower seed. Our mission is to share our passion and expertise, helping you find the perfect botanical piece to complement your home and enrich your life. We believe every plant has a story, and we're here to help you start yours.
                    </p>
                </div>
            </div>
        </div>
    );
};