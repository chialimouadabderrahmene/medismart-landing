"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Download, ArrowDown } from "lucide-react";
import { trackMetaEvent } from "./MetaPixel";

// Always serves the latest FREE MediSmart installer. This endpoint redirects to
// the newest free-baseline build in the official releases repo, so the landing
// page never needs a version bump and never hands out a premium build.
const INSTALLER_URL =
  "https://medismart-backend-main.vercel.app/api/download/latest";

interface TrialModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TrialModal({ open, onClose }: TrialModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submittedRef = useRef(false);

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

  function triggerDownload() {
    const a = document.createElement("a");
    a.href = INSTALLER_URL;
    // Cross-origin redirect to the real installer; the browser handles the .exe
    // as a file download (download attribute is ignored cross-origin).
    a.setAttribute("download", "MediSmart-setup.exe");
    a.rel = "noopener noreferrer";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 200);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submittedRef.current || loading) return;
    if (!form.consent) {
      setError("Veuillez accepter d'être contacté pour continuer.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/medismart/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      submittedRef.current = true;
      trackMetaEvent("Lead", { content_name: "trial_request" });
      triggerDownload();
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
      submittedRef.current = false;
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
                    <Download size={18} color="white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Télécharger MediSmart</h3>
                    <p className="text-xs text-text-secondary">
                      Essai gratuit — 7 jours, sans engagement
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Nom" value={form.nom} onChange={(v) => update("nom", v)} required />
                  <Field label="Prénom" value={form.prenom} onChange={(v) => update("prenom", v)} required />
                </div>
                <div className="mb-3">
                  <Field label="Email professionnel" value={form.email} onChange={(v) => update("email", v)} type="email" required />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Téléphone" value={form.telephone} onChange={(v) => update("telephone", v)} type="tel" required />
                  <Field label="Cabinet" value={form.cabinet} onChange={(v) => update("cabinet", v)} />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Field label="Ville" value={form.ville} onChange={(v) => update("ville", v)} required />
                  <Field label="Spécialité" value={form.specialite} onChange={(v) => update("specialite", v)} required />
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
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>Télécharger MediSmart</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-text-tertiary mt-3">
                  Windows 10/11 · Installation en 5 minutes · 120 Mo
                </p>
              </form>
            ) : (
              <div className="p-8 sm:p-10 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="relative mx-auto mb-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mx-auto">
                    <ArrowDown size={28} className="text-emerald-500" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                    className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 shadow-md"
                    style={{ left: "calc(50% + 16px)" }}
                  >
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-3">Merci Docteur.</h3>
                  <p className="text-sm text-text-secondary mb-6">
                    Votre téléchargement a commencé.<br />
                    Notre équipe vous enverra prochainement votre numéro de série d&apos;essai (7 jours) par e-mail.
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-text-tertiary mb-6"
                >
                  Veuillez vérifier votre boîte de réception ainsi que votre dossier Courrier indésirable.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={handleClose}
                  className="h-11 px-8 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all duration-200 cursor-pointer"
                >
                  Continuer
                </motion.button>
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
