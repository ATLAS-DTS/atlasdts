import { CheckCircle } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function FormSuccess() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <CheckCircle className="h-10 w-10 text-success" aria-hidden="true" />
      <h3 className="mt-4 text-2xl font-semibold text-dark-navy">
        Quote Request Received!
      </h3>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-text-secondary">
        Thanks — our team will review your supplies and get back to you with a
        quote. If you have any questions in the meantime, email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-royal-blue hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
