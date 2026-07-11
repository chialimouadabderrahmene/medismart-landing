"use client";

import { motion } from "framer-motion";
import {
  Users,
  FolderHeart,
  CalendarDays,
  FileText,
  Clock,
  Files,
  Mail,
  LayoutDashboard,
  Brain,
  MessageSquare,
  Activity,
  FlaskConical,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: "Gestion des patients",
    description: "Fichier patient complet avec historique, antécédents et suivi personnalisé.",
    color: "#0066FF",
    bgColor: "rgba(0,102,255,0.08)",
  },
  {
    icon: FolderHeart,
    title: "Dossier médical",
    description: "Dossier médical numérique structuré, accessible et sécurisé.",
    color: "#E11D48",
    bgColor: "rgba(225,29,72,0.08)",
  },
  {
    icon: CalendarDays,
    title: "Rendez-vous",
    description: "Agenda intelligent avec gestion des créneaux et rappels automatiques.",
    color: "#059669",
    bgColor: "rgba(5,150,105,0.08)",
  },
  {
    icon: FileText,
    title: "Ordonnances",
    description: "Rédaction rapide avec base médicamenteuse et vérification des interactions.",
    color: "#7C3AED",
    bgColor: "rgba(124,58,237,0.08)",
  },
  {
    icon: Clock,
    title: "Historique médical",
    description: "Chronologie complète des consultations, examens et traitements.",
    color: "#0891B2",
    bgColor: "rgba(8,145,178,0.08)",
  },
  {
    icon: Files,
    title: "Documents",
    description: "Certificats, bilans et lettres générés automatiquement au format professionnel.",
    color: "#CA8A04",
    bgColor: "rgba(202,138,4,0.08)",
  },
  {
    icon: Mail,
    title: "Courriers",
    description: "Courriers médicaux professionnels avec modèles personnalisables.",
    color: "#DC2626",
    bgColor: "rgba(220,38,38,0.08)",
  },
  {
    icon: LayoutDashboard,
    title: "Tableau de bord",
    description: "Vue d'ensemble de l'activité avec statistiques et indicateurs clés.",
    color: "#2563EB",
    bgColor: "rgba(37,99,235,0.08)",
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle",
    description: "IA clinique intégrée pour l'aide au diagnostic et la synthèse médicale.",
    color: "#9333EA",
    bgColor: "rgba(147,51,234,0.08)",
  },
  {
    icon: MessageSquare,
    title: "Chat IA",
    description: "Assistant conversationnel médical pour questions cliniques instantanées.",
    color: "#0D9488",
    bgColor: "rgba(13,148,136,0.08)",
  },
  {
    icon: Activity,
    title: "Analyse ECG",
    description: "Interprétation automatique des électrocardiogrammes par intelligence artificielle.",
    color: "#E11D48",
    bgColor: "rgba(225,29,72,0.08)",
  },
  {
    icon: FlaskConical,
    title: "Analyse biologique",
    description: "Lecture intelligente des résultats biologiques avec alertes automatiques.",
    color: "#EA580C",
    bgColor: "rgba(234,88,12,0.08)",
  },
  {
    icon: ShieldCheck,
    title: "Interactions médicamenteuses",
    description: "Vérification automatique des contre-indications et interactions.",
    color: "#16A34A",
    bgColor: "rgba(22,163,74,0.08)",
  },
  {
    icon: TrendingUp,
    title: "Courbes patient",
    description: "Suivi graphique de l'évolution des constantes et paramètres biologiques.",
    color: "#0066FF",
    bgColor: "rgba(0,102,255,0.08)",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 section-gradient">
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
              Fonctionnalités
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Tout ce dont votre cabinet{" "}
            <span className="gradient-text">a besoin</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Une suite complète d&apos;outils conçus spécifiquement pour les professionnels de santé.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group glass-card rounded-2xl p-5 transition-all duration-300 cursor-default"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: f.bgColor }}
              >
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
