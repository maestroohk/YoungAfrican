import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="relative flex min-h-[80dvh] items-center overflow-hidden bg-ink text-white">
          <div aria-hidden className="absolute top-1/4 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-lime/10 blur-3xl" />
          <div className="container-page relative py-32">
            <p className="font-mono text-sm tracking-[0.14em] text-lime uppercase">404 · No signal</p>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1] font-semibold tracking-[-0.04em] sm:text-7xl">
              We couldn’t find that page.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-mist">It may have moved, or the link may be incorrect.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/">Back to home</ButtonLink>
              <ButtonLink href="/contact" variant="outline-dark">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
