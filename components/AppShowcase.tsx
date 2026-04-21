"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const screens = [
  {
    id: 8,
    image: "/features/v 0.2.0/2.png",
    title: "Squads & Group Expenses",
    subtitle: "Manage shared finances with roommates, travel buddies, or teams",
    tag: "Squads",
    tagColor: "#FFD700",
    isNew: true,
  },
  {
    id: 9,
    image: "/features/v 0.2.0/1.png",
    title: "Professional Export Tools",
    subtitle: "Generate professional reports in Excel (.xlsx), PDF, and CSV formats",
    tag: "Exports",
    tagColor: "#F44336",
    isNew: true,
  },
  {
    id: 1,
    image: "/features/v 0.1.0/1.png",
    title: "Grow Your Wealth",
    subtitle: "Your balance comes to life as a living tree",
    tag: "Dashboard",
    tagColor: "#4CAF50",
  },
  {
    id: 2,
    image: "/features/v 0.1.0/2.png",
    title: "Track Every Expense",
    subtitle: "Monitor, analyze, and understand your spending in one place",
    tag: "Activity",
    tagColor: "#29B6F6",
  },
  {
    id: 3,
    image: "/features/v 0.1.0/3.png",
    title: "Plan Your Finances",
    subtitle: "Set goals, budgets, and manage debts",
    tag: "Planning",
    tagColor: "#FFA726",
  },
  {
    id: 4,
    image: "/features/v 0.1.0/4.png",
    title: "Your AI Finance Assistant",
    subtitle: "Ask questions and get smart insights instantly",
    tag: "AI Assistant",
    tagColor: "#AB47BC",
  },
  {
    id: 5,
    image: "/features/v 0.1.0/5.png",
    title: "Turn Saving Into a Game",
    subtitle: "Earn rewards, unlock styles, and grow your experience",
    tag: "Gamification",
    tagColor: "#FFD700",
  },
  {
    id: 6,
    image: "/features/v 0.1.0/6.png",
    title: "Customize Your App",
    subtitle: "Switch between unique themes and card styles",
    tag: "Themes",
    tagColor: "#EC407A",
  },
  {
    id: 7,
    image: "/features/v 0.1.0/7.png",
    title: "Secure Your Data",
    subtitle: "Protect and backup your account with military-grade encryption",
    tag: "Security",
    tagColor: "#78909C",
  },
];

export default function AppShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (next: number) => {
    setDirection(next > active ? 1 : -1);
    setActive(next);
  };

  const prev = () => navigate((active - 1 + screens.length) % screens.length);
  const next = () => navigate((active + 1) % screens.length);

  const current = (screens as any)[active];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.95 }),
  };

  return (
    <section id="showcase" className="py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Play Store Preview
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            See RootEXP in Action
          </h2>
          <p className="text-foreground/70 text-lg max-w-xl mx-auto leading-relaxed">
            Real screenshots from the app. Every screen, every feature—designed to put you in control.
          </p>
        </motion.div>

        {/* Main Showcase */}
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Phone Mockup */}
          <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center">
            {/* Navigation + Phone */}
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                className="w-12 h-12 rounded-full glass-base border border-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary transition-colors shadow-lg"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Device Frame */}
              <div
                className="relative rounded-[3rem] overflow-hidden shadow-2xl"
                style={{
                  width: 280,
                  height: 560,
                  border: "2px solid rgba(255,255,255,0.12)",
                  background: "rgba(15,15,15,0.9)",
                  boxShadow: `0 40px 80px -20px rgba(0,0,0,0.6), 0 0 60px -15px ${current.tagColor}44`,
                }}
              >
                {/* Screen notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30" />

                {/* Screenshot */}
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      className="object-cover object-top"
                      sizes="280px"
                      priority={active < 3}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Glare overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                className="w-12 h-12 rounded-full glass-base border border-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary transition-colors shadow-lg"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-6">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    backgroundColor: i === active ? current.tagColor : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="flex-1 w-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {/* Tag Container */}
                <div className="flex items-center gap-3">
                  {/* Tag */}
                  <div
                    className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase"
                    style={{
                      backgroundColor: `${current.tagColor}22`,
                      color: current.tagColor,
                      border: `1px solid ${current.tagColor}44`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: current.tagColor }}
                    />
                    {current.tag}
                  </div>

                  {/* NEW Badge */}
                  {current.isNew && (
                    <div className="px-3 py-1 bg-amber-500 rounded-full flex items-center gap-1.5 animate-pulse shadow-lg shadow-amber-500/20">
                      <Sparkles size={10} className="text-white fill-white" />
                      <span className="text-[10px] font-black tracking-tighter text-white uppercase italic">NEW</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
                  style={{ color: current.tagColor }}
                >
                  {current.title}
                </h3>

                {/* Subtitle */}
                <p className="text-foreground/70 text-lg leading-relaxed max-w-sm">
                  {current.subtitle}
                </p>

                {/* Screen counter */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-5xl font-black tabular-nums opacity-10">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-foreground/40 font-bold">/ {String(screens.length).padStart(2, "0")}</span>
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-3 mt-2">
                  {screens.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(i)}
                      className="relative rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 block"
                      style={{
                        width: 44,
                        height: 80,
                        opacity: i === active ? 1 : 0.35,
                        transform: i === active ? "scale(1.08)" : "scale(1)",
                        border: i === active ? `2px solid ${current.tagColor}` : "2px solid transparent",
                      }}
                    >
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover object-top"
                        sizes="44px"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
