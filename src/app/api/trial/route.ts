import { NextResponse } from "next/server";

// Landing "Télécharger MediSmart" form handler.
//
// The MediSmart admin backend now owns lead storage + email notifications
// (via Brevo), so this route simply forwards each demand to it and lets the
// browser start the download. Doing it here — rather than emailing from the
// landing app — means one email system to maintain and no secret keys in the
// landing repo.

const IS_VERCEL = !!process.env.VERCEL;

// Admin backend base URL. Same deployment the installer link points at.
const BACKEND_BASE =
  process.env.MEDISMART_BACKEND_URL || "https://medismart-backend-main.vercel.app";

interface Lead {
  id: string;
  nom: string;
  prenom: string;
  cabinet: string;
  specialite: string;
  ville: string;
  telephone: string;
  email: string;
  consent: boolean;
  created_at: string;
  status: "pending";
}

// ---------- local dev persistence (unchanged; no-op on Vercel) ----------
async function readLeads(): Promise<Lead[]> {
  if (IS_VERCEL) return [];
  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");
    const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeLead(lead: Lead): Promise<void> {
  if (IS_VERCEL) return;
  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");
    const DATA_DIR = path.join(process.cwd(), "data");
    const LEADS_FILE = path.join(DATA_DIR, "leads.json");
    const leads = await readLeads();
    leads.push(lead);
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("[leads] write error:", err);
  }
}

// ---------- forward the demand to the admin backend ----------
// Best-effort: a backend hiccup must never stop the doctor's download, so we
// swallow errors here and still return success. The form's priority is that
// the installer starts downloading.
async function forwardToBackend(lead: Lead): Promise<void> {
  try {
    const res = await fetch(`${BACKEND_BASE}/api/install-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: lead.nom,
        prenom: lead.prenom,
        cabinet: lead.cabinet,
        specialite: lead.specialite,
        ville: lead.ville,
        telephone: lead.telephone,
        email: lead.email,
        consent: lead.consent,
        source: "landing",
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[trial] backend forward failed:", res.status, body);
    }
  } catch (err) {
    console.error("[trial] backend forward error:", err);
  }
}

// ---------- POST /api/trial ----------
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nom, prenom, specialite, ville, telephone, email } = body;
    if (!nom || !prenom || !specialite || !ville || !telephone || !email) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Duplicate check (local dev only).
    if (!IS_VERCEL) {
      const leads = await readLeads();
      const dup = leads.find(
        (l) => l.email.toLowerCase() === email.toLowerCase()
      );
      if (dup) {
        return NextResponse.json({ success: true, message: "Demande déjà enregistrée" });
      }
    }

    const lead: Lead = {
      id: crypto.randomUUID(),
      nom,
      prenom,
      cabinet: body.cabinet || "",
      specialite,
      ville,
      telephone,
      email,
      consent: !!body.consent,
      created_at: new Date().toISOString(),
      status: "pending",
    };

    await writeLead(lead);
    await forwardToBackend(lead);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/trial] error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// ---------- GET /api/trial (local dev inspection only) ----------
export async function GET() {
  const leads = await readLeads();
  return NextResponse.json(leads);
}
