"use client";

import { ShieldCheck, Lock, Binary, Cpu, Fingerprint, DatabaseBackup } from "lucide-react";
import { motion } from "framer-motion";

export const securitySections = [
  {
    title: "Government-Grade Encryption",
    icon: <Binary className="text-primary" />,
    content: "All sensitive financial data is protected by AES-256 (Advanced Encryption Standard). This ensures that even if someone gained physical access to your device's files, your data remains unreadable."
  },
  {
    title: "Secure Key Derivation",
    icon: <Cpu className="text-primary" />,
    content: "Your PIN is never stored in plain text. We use PBKDF2 with SHA-256 and unique per-device salting to derive cryptographic keys, making brute-force attacks virtually impossible."
  },
  {
    title: "Zero Cloud Footprint",
    icon: <ShieldCheck className="text-primary" />,
    content: "Unlike traditional banks, RootEXP has no central server. Your wallet, transactions, and AI insights live only on your device, eliminating the risk of large-scale data breaches."
  },
  {
    title: "Biometric Integration",
    icon: <Fingerprint className="text-primary" />,
    content: "We leverage hardware-level security (TrustZone/Secure Enclave) for biometrics. Your fingerprint or face data never leaves the device's secure hardware module."
  },
  {
    title: "Encrypted Backups",
    icon: <DatabaseBackup className="text-primary" />,
    content: "Our custom .ajb backup format uses your security PIN to generate a unique encryption key, allowing you to move your data safely between devices without exposing it."
  },
  {
    title: "Local AI Processing",
    icon: <Binary className="text-primary" />,
    content: "The AI Financial Coach runs entirely on-device. No financial logs are sent to LLM providers or cloud APIs for analysis."
  }
];

export function SecurityContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {securitySections.map((section, index) => (
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
