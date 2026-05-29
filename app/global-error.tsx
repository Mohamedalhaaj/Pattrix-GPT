"use client";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink text-white">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase text-white/46">Pattrix</p>
            <h1 className="font-display text-5xl font-semibold leading-none sm:text-7xl">
              Something fell out of frame.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base leading-7 text-white/58">
              The experience can be reset cleanly.
            </p>
            <button
              onClick={reset}
              className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition duration-300 hover:bg-ocean hover:text-white"
            >
              Reset
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
