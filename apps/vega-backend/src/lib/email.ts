import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.EMAIL_FROM || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "Sales@thevegauae.com";

interface LeadEmailData {
  id: number;
  name: string;
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  productName?: string | null;
  sku?: string | null;
  category?: string | null;
  quantity?: string | null;
  location?: string | null;
  message?: string | null;
  sourcePage?: string | null;
  landingPage?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  gclid?: string | null;
  createdAt?: string | Date | null;
}

function buildLeadEmailHtml(lead: LeadEmailData): string {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Company", lead.companyName || "—"],
    ["Phone", lead.phone || "—"],
    ["Email", lead.email || "—"],
    ["Product", lead.productName || "—"],
    ["SKU", lead.sku || "—"],
    ["Category", lead.category || "—"],
    ["Quantity", lead.quantity || "—"],
    ["Location", lead.location || "—"],
    ["Message", lead.message || "—"],
    ["Source Page", lead.sourcePage || "—"],
    ["Landing Page", lead.landingPage || "—"],
    ["UTM Source", lead.utmSource || "—"],
    ["UTM Medium", lead.utmMedium || "—"],
    ["UTM Campaign", lead.utmCampaign || "—"],
    ["UTM Term", lead.utmTerm || "—"],
    ["UTM Content", lead.utmContent || "—"],
    ["gclid", lead.gclid || "—"],
    ["Date", lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "—"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;"><strong>${label}</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eef2f7;font-size:13px;color:#1e293b;word-break:break-word;">${value}</td></tr>`
    )
    .join("");

  return `<div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#1F3A93;color:#ffffff;padding:20px 24px;">
        <div style="font-size:12px;letter-spacing:2px;color:#FFD400;font-weight:bold;text-transform:uppercase;">New Website Enquiry</div>
        <div style="font-size:20px;font-weight:bold;margin-top:4px;">Lead #${lead.id} — ${lead.productName || lead.category || "General"}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:0;">${rowsHtml}</table>
      <div style="padding:16px 24px;background:#f8fafc;font-size:12px;color:#94a3b8;">Sent by Vega UAE website enquiry system.</div>
    </div>
  </div>`;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  if (!resend) {
    console.warn("[Email] RESEND_API_KEY not set — skipping lead notification email.");
    return;
  }
  try {
    const subject = `New Lead: ${lead.productName || lead.category || "Enquiry"} — ${lead.name}`;
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      reply_to: lead.email || NOTIFY_EMAIL,
      subject,
      html: buildLeadEmailHtml(lead),
    });
    console.log(`[Email] Lead #${lead.id} notification sent to ${NOTIFY_EMAIL}`);
  } catch (error) {
    console.error("[Email] Failed to send lead notification:", error);
  }
}