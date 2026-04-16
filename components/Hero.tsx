"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, Smartphone, Sparkles } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import DownloadBadge from "./DownloadBadge";
import FinancialTree, { TREE_SKINS, TreeSkin } from "./FinancialTree";

export default function Hero() {
  const [activeSkinIndex, setActiveSkinIndex] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [growthProgress, setGrowthProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setDownloadCount(data.download_count || 0);
    } catch (e) {
      console.error("Failed to fetch stats", e);
    }
  }, []);

  const handleDownloadClick = async () => {
    try {
      // Optimistic update
      setDownloadCount(prev => prev + 1);
      localStorage.setItem("has_downloaded", "true");
      await fetch("/api/stats", { method: "POST" });
    } catch (e) {
      console.error("Failed to track download", e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const activeSkin = TREE_SKINS[activeSkinIndex];

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(27,94,32,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">
              <Smartphone size={16} />
              <span>Interactive Mobile Model</span>
            </div>

            <DownloadBadge count={downloadCount} />
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight mt-6">
            Watch Your <br />
            <span className="text-primary italic">Wealth Grow</span>
          </h1>
          
          <p className="text-lg text-foreground mb-10 max-w-lg leading-relaxed">
            RootEXP is an offline-first financial powerhouse. <strong className="text-primary">The living, swaying tree you see here is the exact dynamic model rendering inside the app's budget tracker.</strong> Developed by <strong className="text-primary">Alexandre Justin Repia</strong>. Secured on-device. Managed by you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#download" 
              onClick={handleDownloadClick}
              className="bg-primary text-background px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
            >
              <Download size={20} />
              Get RootEXP APK
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative lg:ml-auto w-full flex justify-center items-center"
          onClick={() => setHasInteracted(true)}
        >
          <div className="relative w-full max-w-[600px] aspect-square flex justify-center items-end overflow-visible">
            <FinancialTree 
              onProgressUpdate={setGrowthProgress}
              onSkinChange={setActiveSkinIndex}
            />

            {/* Hint Badge */}
            <AnimatePresence>
              {!hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -10, 0],
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                >
                  <div className="glass-base px-6 py-3 rounded-2xl border-primary/20 shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-black tracking-tight text-foreground/80">Tap to Shake! 🍃</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              key={activeSkin.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 right-0 glass-base glass-card p-4 rounded-2xl border-primary/10 shadow-xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: activeSkin.leafColor }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Active Skin</p>
                  <p className="text-sm font-bold" style={{ color: activeSkin.trunkColor }}>{activeSkin.name}</p>
                </div>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-75" 
                  style={{ width: `${growthProgress * 100}%`, backgroundColor: activeSkin.leafColor }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}