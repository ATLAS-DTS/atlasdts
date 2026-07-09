import Link from "next/link";
import { CONTACT_EMAIL, FACEBOOK_URL } from "@/lib/constants";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-deep py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="" className="h-full w-full" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold text-white">Atlas DTS</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm sm:flex-row sm:gap-4">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:underline">
              {CONTACT_EMAIL}
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white hover:underline"
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <div className="flex gap-4 text-sm text-white/60">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
          <span className="text-[13px] text-white/40">
            © 2026 Atlas DTS. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
