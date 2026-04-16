"use client";

import { motion } from "framer-motion";
import { Download, ShieldAlert, Key, Zap } from "lucide-react";

export const setupSteps = [
  {
    title: "Download the APK",
    icon: <Download className="text-primary" />,
    description: "Click the 'Download APK' button on our landing page. The file will be saved directly to your device as a standalone installer."
  },
  {
    title: "Grant Install Permission",
    icon: <ShieldAlert className="text-primary" />,
    description: "Since this is an offline-first app downloaded outside the Play Store, Android will ask for permission to 'Install from Unknown Sources'. Don't worry, RootEXP carries zero trackers and is completely safe."
  },
  {
    title: "Secure Your Entry",
    icon: <Key className="text-primary" />,
    description: "On first launch, you'll be asked to set a 4-digit security PIN. This PIN becomes your unique key for AES-256 local encryption. Make sure to remember it!"
  },
  {
    title: "Plant Your First Tree",
    icon: <Zap className="text-primary" />,
    description: "Set your initial budget, name your wallet, and watch your first tree sprout! You're now ready to manage your wealth in your own private forest."
  }
];

export function SetupContent() {
  return (
    <div className="space-y-8">
      {setupSteps.map((step, index) => (
        <motion.div
           key={index}
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ delay: index * 0.1 }}
           className="flex gap-6 items-start"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            {step.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <span className="text-primary/40 tabular-nums">0{index + 1}.</span> {step.title}
            </h3>
            <p className="text-foreground/70 leading-relaxed font-medium">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
      
      <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 mt-8">
        <p className="text-sm font-bold text-orange-500 flex items-center gap-2 mb-2">
          <ShieldAlert size={16} /> Technical Note:
        </p>
        <p className="text-xs text-foreground/80 leading-relaxed font-medium">
          If Play Protect flags the app, select &quot;Install Anyway&quot;. This is common for offline apps that do not use cloud monitoring APIs. RootEXP is built for 100% privacy and contains zero invasive code.
        </p>
      </div>
    </div>
  );
}
