"use client";

import { ShieldCheck, Lock, EyeOff, ServerOff, UserCheck, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export const privacySections = [
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

export function PrivacyContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {privacySections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="p-6 rounded-2xl border border-primary/5 bg-surface/50 dark:bg-surface/20 hover:border-primary/20 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            {section.icon}
          </div>
          <h3 className="text-lg font-bold mb-2">{section.title}</h3>
          <p className="text-foreground/70 leading-relaxed text-sm font-medium">
            {section.content}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
