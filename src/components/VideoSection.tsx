"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <section id="demo" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.06] border border-primary/[0.1] mb-6">
            <Play size={12} className="text-primary" fill="currentColor" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Démonstration
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Découvrez MediSmart{" "}
            <span className="gradient-text">en action</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Voyez comment MediSmart transforme la gestion de votre cabinet médical au quotidien.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative rounded-2xl border border-border bg-black overflow-hidden shadow-2xl shadow-black/20 glow">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                      <Play size={32} className="text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Regarder la démonstration
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="flex items-center gap-3 text-white/60 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>MediSmart Pro</span>
                  </div>
                  <span>·</span>
                  <span>Démonstration complète</span>
                  <span>·</span>
                  <span>3:45</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
