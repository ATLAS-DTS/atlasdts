import { z } from "zod";

export const inquirySchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  supplies: z.string().min(10, "Please describe the supplies you'd like to sell"),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const ACCEPTED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
];
export const MAX_PHOTOS = 5;
export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
