import React, { useState } from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    size?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, size = 'h-5 w-5' }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const isInteractive = !!onRatingChange;

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => {
                const displayRating = isInteractive ? hoverRating || rating : rating;
                const isFilled = displayRating >= star;

                return (
                    <button
                        key={star}
                        type="button"
                        disabled={!isInteractive}
                        className={`text-amber-400 ${isInteractive ? 'cursor-pointer' : ''}`}
                        onClick={() => onRatingChange?.(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <StarIcon className={size} filled={isFilled} />
                    </button>
                );
            })}
        </div>
    );
};