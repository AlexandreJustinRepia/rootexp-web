"use client";

import { motion } from "framer-motion";
import { Zap, Target, Users, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Daily Quests",
    description: "Complete quick financial challenges each day to earn 'Leaf' points and grow your forest.",
    icon: <Zap className="text-primary" size={24} />,
    color: "bg-primary/10",
  },
  {
    title: "Savings Goals",
    description: "Set visual milestones for your savings. Witness individual trees thrive as you deposit funds.",
    icon: <Target className="text-primary" size={24} />,
    color: "bg-primary/10",
  },
  {
    title: "Community Forest",
    description: "Connect with others building habits. View social proof of real financial growth in real-time.",
    icon: <Users className="text-primary" size={24} />,
    color: "bg-primary/10",
  },
  {
    title: "Smart Insights",
    description: "AI-driven tips to optimize your spending and increase your level faster than ever.",
    icon: <TrendingUp className="text-primary" size={24} />,
    color: "bg-primary/10",
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-24 px-6 bg-surface dark:bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Gamified Habit Building</h2>
          <p className="text-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            RootEXP combines behavioural psychology with nature aesthetics to make finance management genuinely enjoyable.
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
