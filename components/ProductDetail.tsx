import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Product, Review, User } from '../types';
import { useCart } from '../context/CartContext';
import { generatePlantCareGuide } from '../services/geminiService';
import { BackIcon, LeafIcon, SunIcon, WaterIcon } from './Icons';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  isAuthenticated: boolean;
  currentUser: User | null;
}

const CareGuideDisplay: React.FC<{ guideText: string }> = ({ guideText }) => {
  const sections = guideText.split('### ').filter(s => s.trim() !== '');

  return (
      <div className="space-y-4">
          {sections.map((section, index) => {
              const [title, ...contentLines] = section.split('\n');
              const content = contentLines.join('\n').trim();
              return (
                  <div key={index}>
                      <h4 className="text-md font-bold text-emerald-800 mb-1">{title}</h4>
                      <p className="text-slate-600 whitespace-pre-wrap">{content}</p>
                  </div>
              );
          })}
      </div>
  );
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, isAuthenticated, currentUser }) => {
  const { addToCart } = useCart();
  const [careGuide, setCareGuide] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [localReviews, setLocalReviews] = useState<Review[]>(product.reviews || []);

  const handleGenerateGuide = useCallback(async () => {
    if (!product.name) return;
    setIsLoading(true);
    const guide = await generatePlantCareGuide(product.name);
    setCareGuide(guide);
    setIsLoading(false);
  }, [product.name]);

  useEffect(() => {
    if(product.category === 'Indoor Plants' || product.category === 'Outdoor Plants'){
        handleGenerateGuide();
    }
  }, [product.id, product.category, handleGenerateGuide]);

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!currentUser) return;
    const newReview: Review = {
        id: Date.now(),
        userName: currentUser.name,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0],
    };
    // Prepend the new review to show it at the top
    setLocalReviews(prevReviews => [newReview, ...prevReviews]);
  };
  
  const reviewSummary = useMemo(() => {
    const reviewCount = localReviews.length;
    if (reviewCount === 0) {
        return { average: 0, count: 0 };
    }
    const totalRating = localReviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviewCount;
    return { average: averageRating, count: reviewCount };
  }, [localReviews]);

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-emerald-700 font-medium mb-8 hover:underline">
        <BackIcon className="w-5 h-5"/>
        Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div>
          <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">{product.category}</span>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold my-4 text-slate-800">{product.name}</h1>
          
          {reviewSummary.count > 0 && (
            <div className="flex items-center gap-2 mb-4">
                <StarRating rating={reviewSummary.average} />
                <span className="text-slate-500 text-sm">({reviewSummary.count} reviews)</span>
            </div>
          )}

          <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-bold text-emerald-700">${product.price.toFixed(2)}</span>
          </div>

          <button onClick={() => addToCart(product)} className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md">
            Add to Cart
          </button>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-serif font-bold mb-4 text-slate-700">Details</h3>
            <div className="space-y-3 text-slate-600">
                <p className="flex items-center gap-3"><LeafIcon className="w-5 h-5 text-emerald-500"/> Size: {product.details.size}</p>
                <p className="flex items-center gap-3"><SunIcon className="w-5 h-5 text-emerald-500"/> Light: {product.details.light}</p>
                <p className="flex items-center gap-3"><WaterIcon className="w-5 h-5 text-emerald-500"/> Water: {product.details.water}</p>
            </div>
          </div>
          
          {(product.category === 'Indoor Plants' || product.category === 'Outdoor Plants') && (
            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-serif font-bold mb-4 text-slate-700">AI Plant Care Guide</h3>
                {isLoading ? (
                    <div className="flex items-center gap-3 text-slate-500">
                        <div className="w-5 h-5 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"></div>
                        Generating your personalized care guide...
                    </div>
                ) : careGuide ? (
                   <CareGuideDisplay guideText={careGuide} />
                ) : (
                    <button onClick={handleGenerateGuide} className="text-emerald-600 font-medium">Generate Care Guide</button>
                )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 border-t pt-12">
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">Customer Reviews</h2>
        {isAuthenticated ? (
            <ReviewForm onSubmit={handleReviewSubmit} />
        ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center mb-8">
                <p className="text-slate-600">Please <span className="font-bold text-emerald-700">sign in</span> to leave a review.</p>
            </div>
        )}

        <div className="mt-8 space-y-6">
            {localReviews.length > 0 ? (
                localReviews.map(review => <ReviewCard key={review.id} review={review} />)
            ) : (
                <p className="text-slate-500 text-center py-4">This product has no reviews yet. Be the first to leave one!</p>
            )}
        </div>
      </div>
    </div>
  );
};