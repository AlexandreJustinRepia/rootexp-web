"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";
import FeedbackForm from "./FeedbackForm";
import FeedbackItem from "./FeedbackItem";
import { supabase } from "@/lib/supabase";

interface Feedback {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      // If table doesn't exist yet or other error, we don't crash the UI
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  return (
    <section id="feedback" className="py-24 px-6 relative overflow-hidden bg-surface/30">
      <div className="absolute top-0 right-0 w-1/3 h-full -z-10 bg-[radial-gradient(circle_at_100%_20%,rgba(27,94,32,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-widest"
          >
            <MessageSquare size={14} />
            <span>Community Feedback</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight"
          >
            What our users <span className="text-primary italic">are saying</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground/60 max-w-2xl mx-auto"
          >
            RootEXP is built for you. Your feedback helps us shape the future of offline-first financial management.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <FeedbackForm onSubmitted={fetchFeedback} />
          </motion.div>

          {/* Right Columns: Feedback List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-40 bg-primary/5 rounded-2xl border border-primary/10" />
                ))}
              </div>
            ) : feedbacks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedbacks.map((fb, index) => (
                  <FeedbackItem key={fb.id} feedback={fb} index={index} />
                ))}
              </div>
            ) : (
              <div className="glass-base glass-card rounded-3xl p-12 text-center border-dashed border-primary/20 bg-transparent flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/30">
                  <Star size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">No feedback yet</h4>
                  <p className="text-sm text-foreground/50">Be the first to share your experience!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
