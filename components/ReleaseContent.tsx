"use client";

import { motion } from "framer-motion";
import { Rocket, Sparkles, ShieldCheck, Heart } from "lucide-react";

export const releases = [
  {
    version: "v0.1.0-beta",
    date: "April 15, 2026",
    title: "Initial Ecosystem Launch",
    highlights: [
      { icon: <Rocket className="text-primary" size={16} />, text: "Core financial tree engine with 6 initial skins." },
      { icon: <ShieldCheck className="text-primary" size={16} />, text: "AES-256 local database encryption." },
      { icon: <Sparkles className="text-primary" size={16} />, text: "AI Financial Coach with Cashflow Runway prediction." },
      { icon: <Heart className="text-primary" size={16} />, text: "Rewards shop for cosmetic upgrades and tree health." }
    ]
  }
];

export function ReleaseContent() {
  return (
    <div className="space-y-12">
      {releases.map((release, index) => (
        <div key={index} className="relative pl-8 border-l border-primary/10">
          <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-primary" />
          
          <div className="mb-6">
            <span className="text-xs font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">
              {release.version}
            </span>
            <p className="text-xs font-bold text-foreground/40 mt-2">{release.date}</p>
          </div>

          <h3 className="text-xl font-black mb-6 tracking-tight">{release.title}</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {release.highlights.map((item, hIndex) => (
              <motion.div
                key={hIndex}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: hIndex * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-surface/50 border border-primary/5 hover:border-primary/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <p className="text-sm font-bold text-foreground/70">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="text-center p-8 border-2 border-dashed border-primary/5 rounded-3xl opacity-50">
        <p className="text-sm font-bold text-foreground/40">Upcoming patches: Cloud Export (Optional), Multi-Currency Support</p>
      </div>
    </div>
  );
}
