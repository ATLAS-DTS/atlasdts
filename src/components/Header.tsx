import ScrollToForm from "./ScrollToForm";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-white">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <span className="text-lg font-bold text-dark-navy sm:text-xl">Atlas DTS</span>
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
