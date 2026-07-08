import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";
import { CONTACT_EMAIL } from "@/lib/constants";
import { inquirySchema, ACCEPTED_PHOTO_TYPES, MAX_PHOTO_SIZE_BYTES, MAX_PHOTOS } from "@/lib/validations";

export const runtime = "nodejs";

const STORAGE_BUCKET = "inquiry-photos";
const NOTIFICATIONS_FROM = "notifications@webuydts.com";
const CONFIRMATION_FROM = `Atlas DTS <${CONTACT_EMAIL}>`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fields = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      supplies: String(formData.get("supplies") ?? ""),
    };

    const result = inquirySchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      return NextResponse.json({ success: false, errors: fieldErrors }, { status: 400 });
    }

    const utmSource = String(formData.get("utmSource") ?? "") || null;
    const utmMedium = String(formData.get("utmMedium") ?? "") || null;
    const utmCampaign = String(formData.get("utmCampaign") ?? "") || null;

    const inquiryId = randomUUID();
    const supabase = createAdminClient();

    const photoFiles = formData
      .getAll("photos")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0)
      .slice(0, MAX_PHOTOS);

    const photoUrls: string[] = [];
    for (const file of photoFiles) {
      if (!ACCEPTED_PHOTO_TYPES.includes(file.type) || file.size > MAX_PHOTO_SIZE_BYTES) {
        continue;
      }

      const path = `${inquiryId}/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { contentType: file.type });

      if (uploadError) {
        console.error("Photo upload failed:", uploadError.message);
        continue;
      }

      const { data: publicUrlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
      photoUrls.push(publicUrlData.publicUrl);
    }

    const { error: dbError } = await supabase.from("inquiries").insert({
      id: inquiryId,
      first_name: result.data.firstName,
      last_name: result.data.lastName,
      phone: result.data.phone,
      email: result.data.email,
      supplies_description: result.data.supplies,
      photo_urls: photoUrls.length > 0 ? photoUrls : null,
      status: "new",
      source: "website",
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    });

    if (dbError) {
      console.error("Failed to save inquiry:", dbError.message);
      return NextResponse.json(
        { success: false, error: "Submission failed" },
        { status: 500 },
      );
    }

    try {
      await sendNotificationEmails({ ...result.data, photoUrls, inquiryId });
    } catch (emailError) {
      console.error("Failed to send inquiry emails:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry submission error:", err);
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
  }
}

async function sendNotificationEmails({
  firstName,
  lastName,
  phone,
  email,
  supplies,
  photoUrls,
}: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  supplies: string;
  photoUrls: string[];
  inquiryId: string;
}) {
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const suppliesHtml = supplies.replace(/\n/g, "<br />");

  const adminHtml = `
    <h2>New Inquiry from ${firstName} ${lastName}</h2>
    <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Supplies:</strong><br />${suppliesHtml}</p>
    ${
      photoUrls.length > 0
        ? `<p><strong>Photos:</strong><br />${photoUrls
            .map((url) => `<a href="${url}">${url}</a>`)
            .join("<br />")}</p>`
        : ""
    }
    <p><strong>Submitted at:</strong> ${submittedAt}</p>
  `;

  const adminText = [
    `New Inquiry from ${firstName} ${lastName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Supplies: ${supplies}`,
    photoUrls.length > 0 ? `Photos:\n${photoUrls.join("\n")}` : "",
    `Submitted at: ${submittedAt}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  await resend.emails.send({
    from: NOTIFICATIONS_FROM,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `New Inquiry from ${firstName} ${lastName}`,
    html: adminHtml,
    text: adminText,
  });

  await resend.emails.send({
    from: CONFIRMATION_FROM,
    to: email,
    subject: "Atlas DTS — We've Received Your Inquiry",
    text: `Hi ${firstName},\n\nThanks for submitting your information. Our team will review your supplies and get back to you with a competitive, no-obligation quote.\n\nIf you have any questions in the meantime, reply to this email or reach us at ${CONTACT_EMAIL}.\n\n— Atlas DTS`,
  });
}
