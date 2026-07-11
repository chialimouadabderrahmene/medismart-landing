"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";

interface TrialModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TrialModal({ open, onClose }: TrialModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    cabinet: "",
    specialite: "",
    ville: "",
    telephone: "",
    email: "",
    consent: false,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.consent) {
      setError("Veuillez accepter d'être contacté pour continuer.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setError("");
      setForm({
        nom: "",
        prenom: "",
        cabinet: "",
        specialite: "",
        ville: "",
        telephone: "",
        email: "",
        consent: false,
      });
    }, 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-black/[0.04] transition-colors z-10 cursor-pointer"
            >
              <X size={18} className="text-text-secondary" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl feature-icon-gradient">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Essayer MediSmart</h3>
                    <p className="text-xs text-text-secondary">
                      Accès gratuit pendant 7 jours
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Nom" value={form.nom} onChange={(v) => update("nom", v)} required />
                  <Field label="Prénom" value={form.prenom} onChange={(v) => update("prenom", v)} required />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Cabinet" value={form.cabinet} onChange={(v) => update("cabinet", v)} />
                  <Field label="Spécialité" value={form.specialite} onChange={(v) => update("specialite", v)} required />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Ville" value={form.ville} onChange={(v) => update("ville", v)} required />
                  <Field label="Téléphone" value={form.telephone} onChange={(v) => update("telephone", v)} type="tel" required />
                </div>
                <div className="mb-4">
                  <Field label="Email professionnel" value={form.email} onChange={(v) => update("email", v)} type="email" required />
                </div>

                <label className="flex items-start gap-3 mb-5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-xs text-text-secondary leading-relaxed group-hover:text-foreground transition-colors">
                    J&apos;accepte d&apos;être contacté concernant ma demande d&apos;essai.
                  </span>
                </label>

                {error && (
                  <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Recevoir mon accès d'essai"
                  )}
                </button>
              </form>
            ) : (
              <div className="p-8 sm:p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mx-auto mb-5">
                  <Check size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Merci Docteur.</h3>
                <p className="text-sm text-text-secondary mb-6">
                  Votre demande a bien été enregistrée.
                </p>

                <div className="text-left rounded-xl bg-surface p-5 mb-6">
                  <p className="text-sm font-medium mb-3">
                    Notre équipe vous enverra prochainement :
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Le lien de téléchargement",
                      "Votre numéro de série d'essai valable 7 jours",
                      "Les instructions d'installation",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <Check size={14} className="text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-text-tertiary mb-6">
                  Merci de vérifier également votre dossier spam.
                </p>

                <button
                  onClick={handleClose}
                  className="h-10 px-6 rounded-lg bg-surface hover:bg-black/[0.06] text-sm font-medium transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full h-10 px-3.5 rounded-lg border border-border bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-text-tertiary"
      />
    </div>
  );
}
