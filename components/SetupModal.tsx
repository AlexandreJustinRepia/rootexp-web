"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle } from "lucide-react";
import { SetupContent } from "./SetupContent";
import { useEffect } from "react";

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SetupModal({ isOpen, onClose }: SetupModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl z-[60] cursor-pointer"
          />
          
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-surface dark:bg-surface/90 border border-primary/10 w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              <div className="p-8 pb-4 flex items-center justify-between border-b border-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Setup Guide</h2>
                    <p className="text-sm font-bold text-foreground/40">From Download to Bloom</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 rounded-2xl bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors group"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <SetupContent />
                
                <div className="mt-12 p-8 rounded-3xl bg-primary text-background text-center">
                  <h3 className="text-2xl font-black mb-2">Need More Help?</h3>
                  <p className="mb-6 opacity-80 font-medium text-sm">
                    If you&apos;re stuck at any step, our dev team is ready to assist.
                  </p>
                  <a 
                    href="mailto:alexwaquiz11@gmail.com" 
                    className="inline-block bg-background text-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                  >
                    Contact Developer
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
