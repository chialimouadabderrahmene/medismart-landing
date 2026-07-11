"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Installation",
    q: "Quels sont les prérequis pour installer MediSmart ?",
    a: "MediSmart fonctionne sur Windows 10/11 avec 4 Go de RAM minimum. Aucune configuration serveur n'est nécessaire — tout est intégré dans l'application.",
  },
  {
    category: "Installation",
    q: "Combien de temps prend l'installation ?",
    a: "L'installation complète prend moins de 5 minutes. Un assistant vous guide étape par étape pour configurer votre profil et importer vos données existantes.",
  },
  {
    category: "Configuration",
    q: "Puis-je personnaliser les modèles d'ordonnances et de documents ?",
    a: "Oui, tous les modèles de documents (ordonnances, certificats, bilans, courriers) sont entièrement personnalisables. Vous pouvez modifier l'en-tête, le pied de page, le logo et la mise en forme.",
  },
  {
    category: "Configuration",
    q: "Est-il possible d'importer mes patients depuis un autre logiciel ?",
    a: "MediSmart prend en charge l'import de données depuis les formats standards (CSV, Excel). Notre équipe peut également vous accompagner pour une migration depuis votre logiciel actuel.",
  },
  {
    category: "IA",
    q: "L'intelligence artificielle est-elle fiable pour un usage médical ?",
    a: "Notre IA est conçue comme un outil d'aide à la décision, pas de substitution. Elle s'appuie sur des données probantes et des algorithmes validés. Le médecin garde toujours le contrôle final sur toute décision clinique.",
  },
  {
    category: "IA",
    q: "Quels types d'analyses l'IA peut-elle effectuer ?",
    a: "L'IA peut interpréter des ECG, analyser des résultats biologiques, vérifier les interactions médicamenteuses, générer des synthèses patient et proposer des recommandations cliniques contextuelles.",
  },
  {
    category: "Sécurité",
    q: "Les données de mes patients sont-elles sécurisées ?",
    a: "Absolument. Toutes les données sont stockées localement sur votre poste, chiffrées et protégées par un accès par code PIN. Aucune donnée patient ne transite sur Internet sans votre autorisation explicite.",
  },
  {
    category: "Sécurité",
    q: "MediSmart est-il conforme au RGPD ?",
    a: "Oui, MediSmart est conforme au RGPD et aux réglementations de protection des données de santé. Les données restent sous votre contrôle exclusif.",
  },
  {
    category: "Support",
    q: "Quel support est disponible en cas de problème ?",
    a: "Notre équipe de support est disponible par e-mail et téléphone. Nous proposons également une documentation complète et des tutoriels vidéo pour vous aider au quotidien.",
  },
  {
    category: "Essai",
    q: "La période d'essai est-elle vraiment gratuite ?",
    a: "Oui, l'essai de 7 jours est entièrement gratuit et sans engagement. Aucune carte bancaire n'est requise. Vous accédez à toutes les fonctionnalités pendant la période d'essai.",
  },
  {
    category: "Essai",
    q: "Que se passe-t-il à la fin de la période d'essai ?",
    a: "À la fin de la période d'essai, vous pouvez choisir de continuer avec un abonnement ou simplement arrêter. Vos données restent accessibles et vous pouvez les exporter à tout moment.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
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
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Questions{" "}
            <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Tout ce que vous devez savoir avant de commencer avec MediSmart.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start gap-4 rounded-xl px-5 py-4 text-left hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="mt-0.5 inline-flex h-6 shrink-0 items-center rounded-md bg-primary/[0.06] px-2 text-[10px] font-semibold text-primary uppercase tracking-wider">
                  {faq.category}
                </span>
                <span className="flex-1 text-sm font-semibold leading-relaxed">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`mt-1 shrink-0 text-text-tertiary transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pl-[4.5rem]">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
