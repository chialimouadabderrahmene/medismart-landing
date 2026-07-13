"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const footerLinks = {
  Produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Intelligence IA", href: "#ai" },
    { label: "Démonstration", href: "#demo" },
    { label: "Tarifs", href: "#" },
  ],
  Support: [
    { label: "Documentation", href: "#" },
    { label: "Centre d'aide", href: "#" },
    { label: "Contact", href: "mailto:contact@medismart.software" },
    { label: "FAQ", href: "#faq" },
  ],
  Légal: [
    { label: "Politique de confidentialité", href: "#" },
    { label: "Conditions d'utilisation", href: "#" },
    { label: "RGPD", href: "#" },
    { label: "Mentions légales", href: "#" },
  ],
};

export default function Footer({ onOpenTrial }: { onOpenTrial: () => void }) {
  return (
    <footer className="bg-[#0a0a1a] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 lg:py-20 border-b border-white/[0.08]"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Prêt à transformer votre cabinet ?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Essayez MediSmart gratuitement pendant 7 jours. Sans engagement, sans carte bancaire.
            </p>
            <button
              onClick={onOpenTrial}
              className="h-13 px-8 text-base font-semibold text-[#0a0a1a] rounded-full bg-white hover:bg-white/90 transition-all duration-200 shadow-lg cursor-pointer"
            >
              Commencer l&apos;essai gratuit
            </button>
          </div>
        </motion.div>

        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <Image
                src="/logo.png"
                alt="MediSmart"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-base font-bold">MediSmart</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              L&apos;intelligence artificielle au service de votre cabinet médical.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} MediSmart. Tous droits réservés.
          </span>
          <div className="flex items-center gap-4">
            <a href="mailto:contact@medismart.software" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              contact@medismart.software
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
