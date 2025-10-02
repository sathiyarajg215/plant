import React from 'react';
import { Review } from '../types';
import { StarRating } from './StarRating';
import { UserCircleIcon } from './Icons';

interface ReviewCardProps {
    review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2 mb-3">
                <div className="flex items-center gap-3">
                    <UserCircleIcon className="w-8 h-8 text-slate-400" />
                    <div>
                        <p className="font-bold text-slate-800">{review.userName}</p>
                         <p className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-slate-600 leading-relaxed">{review.comment}</p>
        </div>
    );
};