import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

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

async function readLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

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
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    const leads = await readLeads();

    const duplicate = leads.find(
      (l) => l.email.toLowerCase() === email.toLowerCase()
    );
    if (duplicate) {
      return NextResponse.json({ success: true, message: "Demande déjà enregistrée" });
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

    leads.push(lead);
    await writeLeads(leads);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json(leads);
}
