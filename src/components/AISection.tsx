"use client";

import { motion } from "framer-motion";
import { MessageSquare, Activity, FlaskConical, FileSearch, Lightbulb, Check } from "lucide-react";

const capabilities = [
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "Posez vos questions cliniques et obtenez des réponses contextuelles basées sur les données du patient.",
  },
  {
    icon: Activity,
    title: "Interprétation ECG",
    description: "Analyse automatique des tracés ECG avec détection des anomalies et suggestions diagnostiques.",
  },
  {
    icon: FlaskConical,
    title: "Analyse médicale",
    description: "Interprétation intelligente des résultats biologiques avec mise en évidence des valeurs critiques.",
  },
  {
    icon: FileSearch,
    title: "Synthèse patient",
    description: "Résumé automatique du dossier médical avec antécédents, traitements en cours et alertes.",
  },
  {
    icon: Lightbulb,
    title: "Recommandations cliniques",
    description: "Suggestions thérapeutiques personnalisées basées sur les données probantes et le profil patient.",
  },
];

export default function AISection() {
  return (
    <section id="ai" className="py-24 lg:py-32 ai-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.06] border border-primary/[0.1] mb-6">
            <Brain className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Intelligence Artificielle
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Une intelligence artificielle{" "}
            <span className="gradient-text">réellement intégrée</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Notre IA clinique analyse, synthétise et recommande — directement dans votre flux de travail quotidien.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass-card rounded-2xl p-5 flex gap-4 transition-all duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08]">
                  <cap.icon size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Check size={14} className="text-emerald-500" />
                    <h3 className="text-sm font-semibold">{cap.title}</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare size={12} className="text-primary" />
                </div>
                <span className="text-xs font-semibold">MediSmart AI</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-text-tertiary">En ligne</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary text-white px-4 py-2.5 text-sm">
                    Analyse les derniers résultats biologiques de ce patient et signale les anomalies.
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-surface px-4 py-3 text-sm">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center">
                        <FlaskConical size={10} className="text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-primary">Analyse biologique</span>
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-2">
                      J&apos;ai analysé les résultats du <strong>08/07/2026</strong>. Voici les points d&apos;attention :
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-semibold">Élevé</span>
                        <span className="text-text-secondary">HbA1c : 8.2% (cible &lt; 7%)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-semibold">Limite</span>
                        <span className="text-text-secondary">LDL : 1.45 g/L (cible &lt; 1.30)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-semibold">Normal</span>
                        <span className="text-text-secondary">Créatinine : 9.2 mg/L</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-text-secondary">
                        <strong>Recommandation :</strong> Réévaluation du traitement antidiabétique et contrôle lipidique à 3 mois.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2.5">
                  <span className="flex-1 text-sm text-text-tertiary">
                    Posez votre question clinique...
                  </span>
                  <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Brain({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}
