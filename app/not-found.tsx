import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-pad page-top-offset flex min-h-screen items-center justify-center">
      <section className="mx-auto max-w-2xl text-center">
        <p className="page-kicker">404</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Page Not Found</h1>
        <p className="mt-5 text-lg leading-8 text-gray-300">
          The page you are looking for is not available.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-black text-gray-950 transition hover:bg-amber-100">
          Back Home
        </Link>
      </section>
    </main>
  );
}
