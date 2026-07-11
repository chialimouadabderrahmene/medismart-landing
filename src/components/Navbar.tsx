"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Intelligence IA", href: "#ai" },
  { label: "Démo", href: "#demo" },
  { label: "Comment ça marche", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ onOpenTrial }: { onOpenTrial: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-blur border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl feature-icon-gradient">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Medi<span className="gradient-text">Smart</span>
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-3.5 py-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors rounded-lg hover:bg-black/[0.03]"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onOpenTrial}
                className="h-9 px-5 text-sm font-semibold text-white rounded-full bg-primary hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                Essayer gratuitement
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/[0.04] transition-colors cursor-pointer"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 nav-blur border-b border-border p-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-text-secondary hover:text-foreground rounded-lg hover:bg-black/[0.03] transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenTrial();
                }}
                className="mt-2 h-11 w-full text-sm font-semibold text-white rounded-full bg-primary hover:bg-primary-dark transition-all cursor-pointer"
              >
                Essayer gratuitement
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
