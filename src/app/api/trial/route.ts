import { NextResponse } from "next/server";

// v4 — raw fetch, no SDK — built: 2026-07-11T15:45:00Z
// BUILD_ID: b9f3e1a2c4d5

const IS_VERCEL = !!process.env.VERCEL;

// Hardcoded — not read from env to avoid any Vercel caching issues
const RESEND_KEY = "re_EMMaowN9_2cpnCBw4rjR67xPkusZ2Te2M";
const NOTIFICATION_TO = "chialimouaduae@gmail.com";
const NOTIFICATION_FROM = "MediSmart <noreply@neao.online>";

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

// ---------- local file helpers ----------
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

// ---------- send via Resend HTTP API directly (no SDK) ----------
async function sendNotification(lead: Lead, date: string): Promise<void> {
  const body = {
    from: NOTIFICATION_FROM,
    to: [NOTIFICATION_TO],
    subject: "New MediSmart Trial Request",
    text: [
      "New Trial Request",
      "",
      `Nom: ${lead.nom} ${lead.prenom}`,
      `Email: ${lead.email}`,
      `Téléphone: ${lead.telephone}`,
      `Spécialité: ${lead.specialite}`,
      `Cabinet: ${lead.cabinet}`,
      `Ville: ${lead.ville}`,
      `Date: ${date}`,
    ].join("\n"),
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("[Resend HTTP] error:", JSON.stringify(data));
  } else {
    console.log("[Resend HTTP] sent ok, id:", (data as { id: string }).id);
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

    // Duplicate check (local only)
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

    const date = new Date(lead.created_at).toLocaleString("fr-FR", {
      timeZone: "Africa/Algiers",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    await sendNotification(lead, date);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/trial] error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// ---------- GET /api/trial ----------
export async function GET() {
  const leads = await readLeads();
  return NextResponse.json(leads);
}
