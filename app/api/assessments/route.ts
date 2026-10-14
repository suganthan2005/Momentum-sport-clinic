import { google } from "googleapis";
import { NextResponse } from "next/server";

const areas = new Set(["Knee pain", "Back care", "Shoulder mobility", "Neck stiffness"]);
const redFlagLabels = [
  "Pain that wakes you at night or does not ease with rest",
  "Numbness, tingling, or weakness in an arm or leg",
  "Recent fall, injury, or sudden swelling",
  "Fever, unexplained weight loss, chest pain, or breathlessness",
  "Loss of bladder or bowel control",
];

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatPrivateKey(rawKey: string | undefined): string | undefined {
  if (!rawKey) return undefined;
  let key = rawKey.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }
  key = key.replace(/\\n/g, "\n");
  key = key.replace(/\r\n/g, "\n");
  return key;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = text(body?.name, 120);
    const age = Number(body?.age);
    const phone = text(body?.phone, 40).replace(/\D/g, "");
    const area = text(body?.area, 60);
    const pain = body?.pain === "" || body?.pain == null ? null : Number(body.pain);
    const isSelected = (value: unknown) => value === true || value === "on";
    const flags = Array.isArray(body?.redFlags)
      ? redFlagLabels.map((_, index) => isSelected(body.redFlags[index]))
      : redFlagLabels.map((_, index) => isSelected(body?.[`flag-${index}`]));

    if (!name || !Number.isInteger(age) || age < 18 || age > 110 || phone.length !== 10 || !areas.has(area)) {
      return NextResponse.json({ error: "Please provide valid required assessment details." }, { status: 400 });
    }
    if (pain !== null && (!Number.isFinite(pain) || pain < 0 || pain > 10)) {
      return NextResponse.json({ error: "Pain must be between 0 and 10." }, { status: 400 });
    }

    const config = {
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim(),
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim(),
      privateKey: formatPrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY),
      tabName: process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Assessments",
    };
    if (!config.spreadsheetId || !config.email || !config.privateKey) {
      console.error(
        "Missing Google Sheets configuration. Check GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY."
      );
      return NextResponse.json({ error: "Assessment storage is not configured." }, { status: 503 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: config.email, private_key: config.privateKey },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const selectedRedFlags = redFlagLabels.filter((_, index) => flags[index]);
    const safetyStatus = selectedRedFlags.length > 0 ? "doctor_review_required" : "clear_to_continue";
    const row = [
      new Date().toISOString(), name, age, phone, text(body?.city, 120), area,
      text(body?.duration, 80), pain ?? "", text(body?.goal, 1000), selectedRedFlags.join(", ") || "None",
      safetyStatus, body?.consent === undefined ? "" : Boolean(body.consent),
      text(body?.consentAt, 80),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: `${config.tabName}!A:M`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true, safetyStatus });
  } catch (error) {
    console.error("Error submitting assessment to Google Sheets:", error);
    return NextResponse.json({ error: "We could not save your assessment. Please try again." }, { status: 500 });
  }
}
