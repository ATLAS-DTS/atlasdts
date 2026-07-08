import { AlertTriangle } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

interface FormErrorProps {
  onRetry: () => void;
}

export default function FormError({ onRetry }: FormErrorProps) {
  return (
    <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-error/30 bg-error/5 p-4 text-center">
      <div className="flex items-center gap-2 text-error">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        <p className="text-sm font-medium">
          Something went wrong. Please try again, or email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg border border-error px-4 py-2 text-sm font-semibold text-error hover:bg-error/10"
      >
        Try Again
      </button>
    </div>
  );
}
