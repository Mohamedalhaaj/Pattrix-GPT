"use client";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0171DD]">Pattrix</p>
            <h1 className="mt-6 text-3xl font-semibold">Something went wrong.</h1>
            <p className="mt-3 text-sm opacity-60">The signal dropped for a moment.</p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-8 rounded-full bg-[#101623] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0171DD]"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
