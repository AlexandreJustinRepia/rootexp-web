"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";
import { PrivacyContent } from "@/components/PrivacyContent";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
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
          <PrivacyContent />

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
            <Link 
              href="mailto:alexwaquiz11@gmail.com" 
              className="inline-block bg-background text-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Contact Support
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}