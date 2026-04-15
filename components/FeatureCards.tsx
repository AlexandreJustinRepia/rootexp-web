"use client";

import { motion } from "framer-motion";
import { Trees, Wallet, Bot, Lock } from "lucide-react";

const features = [
  {
    title: "Dynamic Visualization",
    description: "Your financial health is a living tree. It grows with smart habits and withers with overspending. Customize your growth with skins like Sakura or Golden Money.",
    icon: <Trees className="text-primary" size={24} />,
    color: "bg-primary/10",
  },
  {
    title: "Pro Finance Management",
    description: "Multi-wallet support, comprehensive transaction history, savings goals, and aggressive vs. default budget planning modes built right in.",
    icon: <Wallet className="text-primary" size={24} />,
    color: "bg-primary/10",
  },
  {
    title: "AI Financial Coach",
    description: "Run 'What-if' scenario simulations, get cashflow forecasts, and receive adaptive coaching to optimize debt payoff—all powered by a fully offline, on-device AI.",
    icon: <Bot className="text-primary" size={24} />,
    color: "bg-primary/10",
  },
  {
    title: "Absolute Privacy",
    description: "100% offline. All data is stored locally on your device with zero cloud tracking. Secured by mandatory PIN and biometric authentication.",
    icon: <Lock className="text-primary" size={24} />,
    color: "bg-primary/10",
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-24 px-6 bg-surface dark:bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Gamified, Yet Professional</h2>
          <p className="text-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            A gritty, no-nonsense approach to securing your bag, wrapped in a beautiful, nature-inspired aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-base glass-card p-8 rounded-3xl border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/5 group"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}