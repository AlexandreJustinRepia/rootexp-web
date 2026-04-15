"use client";

import { motion } from "framer-motion";
import StarRating from "./StarRating";
import { UserCircle } from "lucide-react";

interface Feedback {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function FeedbackItem({ feedback, index }: { feedback: Feedback; index: number }) {
  const date = new Date(feedback.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-base glass-card p-6 rounded-2xl flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <UserCircle size={24} />
          </div>
          <div>
            <p className="font-bold text-sm">{feedback.user_name || "Anonymous User"}</p>
            <p className="text-[10px] text-foreground/50 uppercase tracking-widest">{date}</p>
          </div>
        </div>
        <StarRating rating={feedback.rating} />
      </div>
      
      <p className="text-foreground/80 text-sm leading-relaxed italic">
        &quot;{feedback.comment}&quot;
      </p>
    </motion.div>
  );
}
