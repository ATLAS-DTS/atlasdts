export type InquiryStatus =
  | "new"
  | "quoted"
  | "accepted"
  | "shipped"
  | "inspecting"
  | "paid"
  | "declined"
  | "closed";

export interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  supplies_description: string;
  photo_urls: string[] | null;
  status: InquiryStatus;
  quote_amount: number | null;
  admin_notes: string | null;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
  updated_at: string;
}

export interface InquirySubmission {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  supplies: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface UploadedPhoto {
  file: File;
  id: string;
  previewUrl: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
