"use client";

import { motion } from "framer-motion";
import { Download, Shield } from "lucide-react";

export default function GrowthCTA() {
  return (
    <section id="download" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto glass-base glass-card p-12 lg:p-20 rounded-[3rem] text-center border-primary/10 shadow-3xl shadow-primary/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6 text-primary">
            <Shield size={48} />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">Ready to plant your <span className="text-primary italic">Roots</span>?</h2>
          <p className="text-xl text-foreground mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            The app is fully functional and ready to go. No external dependencies, no subscriptions, no data tracking. Just you, your money, and your forest.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-primary text-background px-10 py-5 rounded-3xl font-black text-xl shadow-2xl shadow-primary/40 hover:scale-105 transition-transform flex items-center justify-center gap-3">
              <Download size={24} />
              Download APK (Android)
            </button>
          </div>
          <p className="mt-6 text-sm font-bold text-foreground/50">
            Requires Android 8.0 or higher.
          </p>
        </motion.div>
      </div>
    </section>
  );
}