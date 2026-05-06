import React, { useState } from 'react';
import { useReviewStore } from '../store/useReviewStore';
import { StarRating } from './StarRating';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { getReviewsByProductId, addReview } = useReviewStore();
  const reviews = getReviewsByProductId(productId);
  
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    addReview({
      productId,
      userName,
      rating: newRating,
      comment: newComment
    });
    
    setNewComment('');
    setUserName('');
    setNewRating(5);
    setShowForm(false);
    toast.success('Review submitted successfully!');
  };

  return (
    <div id="reviews" className="mt-16 border-t border-gray-100 pt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-heading text-gray-900 mb-1">Customer Reviews</h2>
          <div className="flex items-center space-x-2">
            <StarRating rating={reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length) : 0} size={18} />
            <span className="text-sm font-medium text-gray-600">{reviews.length} total reviews</span>
          </div>
        </div>
        
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)}
            variant="outline"
            className="rounded-full border-brand-pink text-brand-pink hover:bg-brand-pink/5"
          >
            Write a Review
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12 bg-gray-50 rounded-2xl p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900">Share your thoughts</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                  <StarRating rating={newRating} interactive size={24} onRatingChange={setNewRating} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                  <textarea 
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink"
                    placeholder="What did you like or dislike about this product?"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="bg-brand-pink hover:bg-brand-pink-dark">
                  Post Review
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={review.id} 
              className="flex gap-4 pb-8 border-b border-gray-50 last:border-0"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-pink/10 flex items-center justify-center shrink-0">
                <User size={20} className="text-brand-pink" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">{review.userName}</h4>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <StarRating rating={review.rating} size={14} className="mb-3" />
                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
