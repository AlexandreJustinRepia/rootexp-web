"use client";

import { motion } from "framer-motion";
import { Download, Shield, AlertTriangle, MessageSquareHeart } from "lucide-react";

export default function GrowthCTA() {
  const downloadUrl = "https://ygqchzi8ix54u4fs.public.blob.vercel-storage.com/RootEXP%20%28Early%20Access%29.apk";

  const handleDownload = () => {
    window.location.href = downloadUrl;
  };

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
          
          <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">
            Ready to plant your <span className="text-primary italic">Roots</span>?
          </h2>
          
          <p className="text-xl text-foreground mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            The app is fully functional and ready to go. No external dependencies, no subscriptions, no data tracking. Just you, your money, and your forest.
          </p>
          
          {/* Main CTA */}
          <div className="flex flex-col gap-6 justify-center items-center">
            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto bg-primary text-background px-10 py-5 rounded-3xl font-black text-xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-3 cursor-pointer"
            >
              <Download size={24} />
              Download APK (Android)
            </button>

            {/* Early Access Notice Box */}
            <div className="max-w-md bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 text-orange-500 font-bold uppercase text-xs tracking-widest">
                <AlertTriangle size={16} />
                Early Access Build
              </div>
              <p className="text-sm text-foreground/80 leading-snug">
                RootEXP is currently in active development. You might encounter some bugs—if you do, your feedback is invaluable in helping the forest grow!
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm font-bold text-foreground/50">
            Requires Android 8.0 or higher.
          </p>
        </motion.div>
      </div>
    </section>
  );
}