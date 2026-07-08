import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-light-grey px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-dark-navy">Page not found.</h1>
      <p className="mt-2 text-base text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-royal-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-royal-blue-dark"
      >
        Go back home
      </Link>
    </div>
  );
}
