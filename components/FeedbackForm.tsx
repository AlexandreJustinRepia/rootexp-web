"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import StarRating from "./StarRating";
import { supabase } from "@/lib/supabase";

export default function FeedbackForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setStatus("error");
      setErrorMessage("Please provide a star rating.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const { error } = await supabase.from("feedback").insert([
        {
          rating,
          comment,
          user_name: userName || "Anonymous User",
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setRating(0);
      setComment("");
      setUserName("");
      onSubmitted();

      // Reset success status after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setStatus("error");
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-base glass-card p-8 rounded-3xl border-primary/20">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Send className="text-primary" size={20} />
        Leave your feedback
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 opacity-70">How would you rate your experience?</label>
          <StarRating rating={rating} onRatingChange={setRating} interactive />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 opacity-70">Your Name (Optional)</label>
          <input
            id="name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-surface/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2 opacity-70">Your Feedback</label>
          <textarea
            id="comment"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What do you think about the RootEXP app?"
            rows={4}
            className="w-full bg-surface/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || status === "success"}
          className="w-full bg-primary text-background font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
            />
          ) : status === "success" ? (
            <>
              <CheckCircle2 size={20} />
              Feedback Received!
            </>
          ) : (
            <>
              <Send size={18} />
              Submit Feedback
            </>
          )}
        </button>

        <AnimatePresence>
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 mt-4"
            >
              <AlertCircle className="mt-0.5 shrink-0" size={18} />
              <p className="text-sm">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
