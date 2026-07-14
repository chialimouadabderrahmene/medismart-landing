import { NextResponse } from "next/server";

// v5 — fixed API key + error propagation

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
  const payload = {
    from: NOTIFICATION_FROM,
    to: [NOTIFICATION_TO],
    subject: `Nouvelle demande d'essai — Dr. ${lead.nom} ${lead.prenom}`,
    html: [
      `<h2>Nouvelle demande d'essai MediSmart</h2>`,
      `<table style="border-collapse:collapse;font-family:sans-serif;">`,
      `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Nom</td><td>${lead.nom} ${lead.prenom}</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email</td><td>${lead.email}</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Téléphone</td><td>${lead.telephone}</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Spécialité</td><td>${lead.specialite}</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Cabinet</td><td>${lead.cabinet || "—"}</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Ville</td><td>${lead.ville}</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Date</td><td>${date}</td></tr>`,
      `</table>`,
    ].join(""),
  };

  console.log("[Resend] sending to", NOTIFICATION_TO, "from", NOTIFICATION_FROM);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("[Resend] FAILED:", res.status, JSON.stringify(data));
    throw new Error(`Resend error: ${(data as { message?: string }).message || res.status}`);
  }
  console.log("[Resend] sent ok, id:", (data as { id: string }).id);
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

    try {
      await sendNotification(lead, date);
    } catch (emailErr) {
      console.error("[/api/trial] email failed (non-blocking):", emailErr);
    }

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
