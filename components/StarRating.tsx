"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

export default function StarRating({ rating, onRatingChange, interactive = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive ? (hoverRating || rating) : rating;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={interactive ? { scale: 1.2 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${
            star <= displayRating ? "text-yellow-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer" : "cursor-default"}`}
        >
          <Star 
            size={interactive ? 24 : 16} 
            fill={star <= displayRating ? "currentColor" : "transparent"} 
          />
        </motion.button>
      ))}
    </div>
  );
}
