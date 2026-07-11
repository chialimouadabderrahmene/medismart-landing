"use client";

import { motion } from "framer-motion";
import { ClipboardEdit, UserCheck, Mail, Download, Check } from "lucide-react";

const steps = [
  {
    icon: ClipboardEdit,
    step: "01",
    title: "Remplissez le formulaire",
    description: "Complétez le formulaire de demande d'essai avec vos informations professionnelles.",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Vérification de votre demande",
    description: "Notre équipe vérifie votre demande et prépare votre accès personnalisé.",
  },
  {
    icon: Mail,
    step: "03",
    title: "Recevez vos accès par e-mail",
    items: [
      "Le lien de téléchargement",
      "Votre numéro de série d'essai",
    ],
  },
  {
    icon: Download,
    step: "04",
    title: "Installez MediSmart",
    description: "Téléchargez et installez MediSmart en quelques minutes sur votre poste.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 lg:py-32 section-gradient">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.06] border border-primary/[0.1] mb-6">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Comment ça marche
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Commencez en{" "}
            <span className="gradient-text">4 étapes</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Un processus simple et rapide pour découvrir MediSmart dans votre cabinet.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative flex gap-6 items-start"
                >
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white border border-border shadow-sm">
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {s.step}
                    </div>
                    <s.icon size={24} className="text-primary" />
                  </div>

                  <div className="glass-card rounded-2xl p-5 flex-1">
                    <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                    {s.description && (
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {s.description}
                      </p>
                    )}
                    {s.items && (
                      <div className="flex flex-col gap-2 mt-1">
                        {s.items.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                            <Check size={14} className="text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
