import React, { useState } from 'react';
import { StarRating } from './StarRating';

interface ReviewFormProps {
    onSubmit: (rating: number, comment: string) => Promise<void>;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating.');
            return;
        }
        if (comment.trim() === '') {
            setError('Please write a comment.');
            return;
        }
        
        setError('');
        setIsLoading(true);
        await onSubmit(rating, comment);
        setIsLoading(false);
        setRating(0);
        setComment('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
            <h3 className="text-xl font-serif font-bold text-slate-800 mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
                    <StarRating rating={rating} onRatingChange={setRating} size="w-7 h-7"/>
                </div>
                <div>
                     <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-1">Your Comment</label>
                     <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Share your thoughts about this product..."
                     />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <div>
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-sm disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Submitting...</span>
                            </>
                        ) : (
                            'Submit Review'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};