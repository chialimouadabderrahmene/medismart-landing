"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

export default function Hero({ onOpenTrial }: { onOpenTrial: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-16">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="absolute top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px] animate-pulse-ring" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[80px] animate-pulse-ring" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.06] border border-primary/[0.1] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                Nouveau — Intelligence artificielle clinique
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          >
            L&apos;intelligence artificielle{" "}
            <span className="gradient-text">au service</span> de votre
            cabinet médical.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg lg:text-xl text-text-secondary leading-relaxed mb-10"
          >
            MediSmart simplifie la gestion du cabinet médical grâce à une
            plateforme moderne intégrant une intelligence artificielle clinique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onOpenTrial}
              className="group h-13 px-8 text-base font-semibold text-white rounded-full bg-primary hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 flex items-center gap-2 cursor-pointer"
            >
              Essayer gratuitement
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
            <a
              href="#demo"
              className="group h-13 px-8 text-base font-semibold text-foreground rounded-full border border-border hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-300 flex items-center gap-2"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                <Play size={12} className="text-primary ml-0.5" fill="currentColor" />
              </div>
              Voir la démonstration
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl border border-border bg-white shadow-2xl shadow-black/[0.08] overflow-hidden glow">
            <div className="flex items-center gap-2 px-5 py-3 bg-surface border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white border border-border text-xs text-text-tertiary font-mono">
                  medismart.software
                </div>
              </div>
            </div>

            <div className="relative aspect-[16/9] bg-gradient-to-br from-surface to-white overflow-hidden">
              <DashboardMockup />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="absolute inset-0 p-6 flex gap-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-56 shrink-0 flex flex-col gap-3"
      >
        <div className="h-10 rounded-lg bg-primary/10 flex items-center px-3 gap-2">
          <div className="w-5 h-5 rounded bg-primary/20" />
          <div className="h-2.5 w-20 rounded bg-primary/30" />
        </div>
        {["Patients", "Rendez-vous", "Ordonnances", "Documents", "IA Chat"].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
            className={`h-9 rounded-lg flex items-center px-3 gap-2 ${
              i === 0 ? "bg-primary/[0.08] border border-primary/10" : "hover:bg-black/[0.02]"
            }`}
          >
            <div className={`w-4 h-4 rounded ${i === 0 ? "bg-primary/20" : "bg-black/[0.06]"}`} />
            <span className={`text-xs font-medium ${i === 0 ? "text-primary" : "text-text-secondary"}`}>
              {item}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex-1 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="h-3 w-32 rounded bg-black/[0.08] mb-1.5" />
            <div className="h-2 w-48 rounded bg-black/[0.04]" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10" />
            <div className="h-8 w-8 rounded-lg bg-black/[0.04]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Patients", value: "1,247", color: "bg-blue-500" },
            { label: "Aujourd'hui", value: "18", color: "bg-emerald-500" },
            { label: "Ordonnances", value: "342", color: "bg-violet-500" },
            { label: "IA Analyses", value: "89", color: "bg-amber-500" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
              className="rounded-xl border border-border bg-white p-3 shadow-sm"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className={`w-2 h-2 rounded-full ${card.color}`} />
                <span className="text-[10px] font-medium text-text-tertiary">{card.label}</span>
              </div>
              <span className="text-lg font-bold">{card.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex-1 rounded-xl border border-border bg-white p-4 shadow-sm"
        >
          <div className="h-2.5 w-28 rounded bg-black/[0.08] mb-4" />
          <div className="h-full flex items-end gap-2 pb-2">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.7 + i * 0.05, duration: 0.4 }}
                className="flex-1 rounded-t-md origin-bottom"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, var(--primary) 0%, var(--accent) 100%)`,
                  opacity: 0.15 + (h / 100) * 0.6,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
