"use client";

import { motion } from "framer-motion";
import { Trees, Menu, X, Download } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Sync initial theme
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    // Watch for theme changes on html element
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-base glass-nav px-6 py-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
            {theme === "light" ? (
              <img src="/icon-light.png" alt="RootEXP Logo" className="w-full h-full object-cover" />
            ) : (
              <img src="/icon-dark.png" alt="RootEXP Logo" className="w-full h-full object-cover" />
            )}
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">RootEXP</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#features" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Features</a>
          <ThemeToggle />
          <a 
            href="#download" 
            onClick={() => fetch("/api/stats", { method: "POST" })}
            className="bg-primary text-background px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Download size={16} />
            Download APK
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-6 right-6 glass-base glass-nav p-6 rounded-2xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            <a href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Features</a>
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            <a href="#download" className="bg-primary text-background w-full py-3 rounded-xl font-bold shadow-lg shadow-primary/20 flex justify-center items-center gap-2">
              <Download size={20} />
              Download APK
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}