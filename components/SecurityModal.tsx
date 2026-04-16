"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { SecurityContent } from "./SecurityContent";
import { useEffect } from "react";

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  // Prevent scrolling when modal is open
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl z-[60] cursor-pointer"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-surface dark:bg-surface/90 border border-primary/10 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="p-8 pb-4 flex items-center justify-between border-b border-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Security Protocol</h2>
                    <p className="text-sm font-bold text-foreground/40">Technical Details & Standards</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 rounded-2xl bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors group"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <SecurityContent />
                
                {/* Contact Footer in Modal */}
                <div className="mt-12 p-8 rounded-3xl bg-primary text-background text-center">
                  <h3 className="text-2xl font-black mb-2">Technical Questions?</h3>
                  <p className="mb-6 opacity-80 font-medium text-sm">
                    We are transparent about our security architecture. If you're a security researcher or have concerns, get in touch.
                  </p>
                  <a 
                    href="mailto:alexwaquiz11@gmail.com" 
                    className="inline-block bg-background text-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                  >
                    Contact Support
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
