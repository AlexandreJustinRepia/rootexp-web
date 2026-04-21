"use client";

import { motion } from "framer-motion";
import { 
  Rocket, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Users, 
  Camera, 
  FileSpreadsheet, 
  Zap, 
  AlertTriangle,
  Info
} from "lucide-react";

export const releases = [
  {
    version: "v0.2.0",
    date: "April 21, 2026",
    title: "The 'Squad & Sharing' Mega Update!",
    notice: "Before installing v0.2.0, please export a backup and uninstall v0.1.0. After installing v0.2.0, import your exported backup to restore your data.",
    sections: [
      {
        title: "👥 Squads & Group Expenses",
        items: [
          { icon: <Users className="text-primary" size={16} />, text: "Create and Manage Squads for roommates, travel, or teams." },
          { icon: <ShieldCheck className="text-primary" size={16} />, text: "Log squad expenses with Equal, Percentage, or Specific splits." },
          { icon: <Sparkles className="text-primary" size={16} />, text: "Premium 'Carbon Dark' digital receipts with secure verification." }
        ]
      },
      {
        title: "📔 Visual Bookkeeping",
        items: [
          { icon: <Camera className="text-primary" size={16} />, text: "Attach photos, receipts, or documents to any transaction." },
          { icon: <Info className="text-primary" size={16} />, text: "In-app gallery preview with full-screen transaction details." },
          { icon: <ShieldCheck className="text-primary" size={16} />, text: "Secure private local storage for all attachments." }
        ]
      },
      {
        title: "📊 Professional Export Tools",
        items: [
          { icon: <FileSpreadsheet className="text-primary" size={16} />, text: "Generate formatted Excel (.xlsx) spreadsheets with summaries." },
          { icon: <Info className="text-primary" size={16} />, text: "Printer-friendly PDF reports with category spending charts." },
          { icon: <Zap className="text-primary" size={16} />, text: "Clean CSV support for external accounting software integration." }
        ]
      },
      {
        title: "⚙️ Performance & UX Improvements",
        items: [
          { icon: <Zap className="text-primary" size={16} />, text: "Smooth loading indicators and real-time success feedback." },
          { icon: <Users className="text-primary" size={16} />, text: "New 'Edit Squad Name' feature for full group control." },
          { icon: <Rocket className="text-primary" size={16} />, text: "Optimized backend data models for lightning-fast performance." }
        ]
      }
    ]
  },
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

          {release.notice && (
            <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm font-bold text-amber-500/90 leading-relaxed">
                {release.notice}
              </p>
            </div>
          )}
          
          {release.sections ? (
            <div className="space-y-8">
              {release.sections.map((section, sIndex) => (
                <div key={sIndex}>
                  <h4 className="text-xs font-black text-foreground/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/40" />
                    {section.title}
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {section.items.map((item, iIndex) => (
                      <motion.div
                        key={iIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: iIndex * 0.05 }}
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
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {release.highlights?.map((item, hIndex) => (
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
          )}
        </div>
      ))}
      
      <div className="text-center p-8 border-2 border-dashed border-primary/5 rounded-3xl opacity-50">
        <p className="text-sm font-bold text-foreground/40">RootEXP 0.2.0 — Take control of your money, together.</p>
      </div>
    </div>
  );
}
