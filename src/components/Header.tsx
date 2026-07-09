import Link from "next/link";
import ScrollToForm from "./ScrollToForm";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-white">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" className="h-9 w-9" aria-hidden="true" />
          <span className="text-lg font-bold text-dark-navy sm:text-xl">Atlas DTS</span>
        </Link>
        <ScrollToForm
          className="rounded-lg bg-royal-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-blue-dark sm:px-6 sm:text-base"
          aria-label="Get a free quote"
        >
          <span className="sm:hidden">Free Quote</span>
          <span className="hidden sm:inline">Get a Free Quote</span>
        </ScrollToForm>
      </div>
    </header>
  );
}
