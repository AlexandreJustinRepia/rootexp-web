"use client";

import { Trees } from "lucide-react";

// ... (Keep your TwitterIcon, InstagramIcon, GithubIcon exactly as they were in your code)

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-primary/5 bg-surface dark:bg-surface/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background">
              <Trees size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">RootEXP</span>
          </div>
          <p className="text-foreground max-w-sm mb-8 leading-relaxed font-medium">
            Revolutionizing personal finance by making budgeting as engaging as your favorite game. Total privacy, zero cloud reliance.
          </p>
          {/* Social Icons Container */}
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Application</h4>
          <ul className="space-y-4 text-sm font-bold text-foreground">
            <li><a href="#download" className="hover:text-primary transition-colors">Download APK</a></li>
            <li><a href="#features" className="hover:text-primary transition-colors">App Features</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Setup Guide</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Release Notes</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Legal & Support</h4>
          <ul className="space-y-4 text-sm font-bold text-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Offline Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Security Details</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary/5 text-center text-sm font-bold text-foreground/40">
        © 2026 RootEXP. Rooted in financial integrity.
      </div>
    </footer>
  );
}