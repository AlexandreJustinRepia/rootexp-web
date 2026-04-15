"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, EyeOff, ServerOff, UserCheck, Trash2 } from "lucide-react";

const sections = [
  {
    title: "Overview",
    icon: <ShieldCheck className="text-primary" />,
    content: "RootEXP is designed with a privacy-first approach. We do not collect, store, or share any personal data externally. All your financial data remains entirely on your device."
  },
  {
    title: "Information We Do NOT Collect",
    icon: <EyeOff className="text-primary" />,
    content: "RootEXP does not collect or transmit personal identification (name, email), financial account data, transaction history, location data, or usage analytics. We use no cookies or tracking scripts."
  },
  {
    title: "Local Data Storage",
    icon: <Lock className="text-primary" />,
    content: "All data—including wallet balances, transactions, and AI insights—is stored locally on your device using secure storage mechanisms. There is no cloud synchronization."
  },
  {
    title: "AI Financial Coach",
    icon: <UserCheck className="text-primary" />,
    content: "Our AI coach operates entirely offline. It processes your data locally to generate insights without ever sending information to external servers."
  },
  {
    title: "Internet Usage",
    icon: <ServerOff className="text-primary" />,
    content: "RootEXP does not require an internet connection to function. It does not connect to external servers or use third-party APIs that collect user information."
  },
  {
    title: "Data Deletion",
    icon: <Trash2 className="text-primary" />,
    content: "You have full control. You can permanently remove all stored information at any time by clearing app data in your device settings or uninstalling the app."
  }
];

export default function PrivacyPolicy() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
          >
            <ShieldCheck size={16} />
            <span>Privacy First Architecture</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-foreground/60 font-medium">
            Effective Date: April 15, 2026
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl border border-primary/5 bg-surface dark:bg-surface/50 hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                <p className="text-foreground/70 leading-relaxed font-medium">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 p-8 rounded-3xl bg-primary text-background text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Questions?</h3>
            <p className="mb-6 opacity-90 font-medium">
              We are committed to your financial integrity. If you have questions about our offline-first approach, reach out.
            </p>
            <a 
              href="mailto:support@rootexp.com" 
              className="inline-block bg-background text-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}