"use client";

import { motion } from "framer-motion";
import { Download, Users } from "lucide-react";

export default function DownloadBadge({ count }: { count: number }) {
  // Format count (e.g., 1234 -> 1,234)
  const formattedCount = new Intl.NumberFormat().format(count);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-base glass-card border-primary/20 shadow-lg"
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Users size={16} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Downloads</p>
        <p className="text-sm font-bold text-primary tabular-nums">
          {formattedCount}+ <span className="text-[10px] opacity-60 font-medium">Community Members</span>
        </p>
      </div>
    </motion.div>
  );
}
