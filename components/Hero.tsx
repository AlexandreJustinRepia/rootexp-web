"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(27,94,32,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
            <Sparkles size={16} />
            <span>New: Daily Financial Quests are live!</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Grow Your Wealth <br />
            <span className="text-primary italic">One Branch</span> at a Time
          </h1>
          
          <p className="text-lg text-foreground mb-10 max-w-lg leading-relaxed">
            RootEXP turns budgeting into a game. Manage your finances, complete daily quests, and watch your digital tree grow into a lush forest of savings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-background px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform group">
              Start Your Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg border-2 border-primary/20 hover:bg-primary/5 transition-colors">
              How it Works
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 text-sm font-bold text-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              <span>Bank-level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf size={18} className="text-primary" />
              <span>No Hidden Fees</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:ml-auto"
        >
          <div className="relative z-10 w-full max-w-[500px] aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 animate-float">
            <Image 
              src="/hero-tree.png" 
              alt="RootEXP Growth Tree" 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 glass-base glass-card p-4 rounded-2xl shadow-xl z-20 border-primary/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">LV. 12</div>
              <div>
                <div className="text-xs font-bold opacity-50">CURRRENT HABIT</div>
                <div className="text-sm font-extrabold text-primary">Great Oak Growth</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 glass-base glass-card p-4 rounded-2xl shadow-xl z-20 border-primary/10"
          >
            <div className="text-xs font-bold opacity-50 mb-1">SAVINGS GOAL</div>
            <div className="text-xl font-black text-primary">$1,250.00</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
