"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Lock, Download, ArrowUpRight } from "lucide-react";
import StarRating from "./StarRating";
import ReCAPTCHA from "react-google-recaptcha";

export default function FeedbackForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Check download status on mount and via interval
  useEffect(() => {
    const checkStatus = () => {
      const downloaded = localStorage.getItem("has_downloaded") === "true";
      setHasDownloaded(downloaded);
    };

    checkStatus();
    
    // Poll every 2 seconds if not downloaded yet
    const interval = setInterval(() => {
      if (!hasDownloaded) {
        checkStatus();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [hasDownloaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasDownloaded) {
      setStatus("error");
      setErrorMessage("Please download the app first to leave feedback.");
      return;
    }

    if (rating === 0) {
      setStatus("error");
      setErrorMessage("Please provide a star rating.");
      return;
    }

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setStatus("error");
      setErrorMessage("Please complete the reCAPTCHA challenge.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment,
          user_name: userName || "Anonymous User",
          token,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit feedback");
      }

      setStatus("success");
      setRating(0);
      setComment("");
      setUserName("");
      recaptchaRef.current?.reset();
      onSubmitted();

      // Reset success status after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setStatus("error");
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasDownloaded) {
    return (
      <div className="glass-base glass-card p-12 rounded-[2.5rem] border-primary/20 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 -z-10 group-hover:scale-110 transition-transform duration-700" />
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 text-primary shadow-inner">
          <Lock size={40} className="animate-pulse" />
        </div>
        <h3 className="text-3xl font-black mb-4 tracking-tight">Experience First</h3>
        <p className="text-foreground/60 max-w-xs mx-auto mb-10 font-medium leading-relaxed">
          Please download and try the RootEXP app before leaving your review. We value authentic feedback from our users!
        </p>
        <a 
          href="#download" 
          onClick={() => {
            localStorage.setItem("has_downloaded", "true");
            setHasDownloaded(true);
          }}
          className="inline-flex items-center gap-2 bg-primary text-background px-10 py-5 rounded-2xl font-black shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all text-lg"
        >
          <Download size={24} />
          Get RootEXP Now
          <ArrowUpRight size={20} className="opacity-50" />
        </a>
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/40">
            Unlocks automatically after download
          </p>
          <button 
            onClick={() => {
              localStorage.setItem("has_downloaded", "true");
              setHasDownloaded(true);
            }}
            className="text-[10px] font-bold uppercase tracking-widest text-primary/30 hover:text-primary transition-colors cursor-pointer underline underline-offset-4"
          >
            Already downloaded? Click to unlock
          </button>
        </div>

      </div>
    );
  }

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

        <div className="flex justify-center py-2 overflow-hidden">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE || ""}
            theme="light" 
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

