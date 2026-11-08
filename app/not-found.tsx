import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ButtonLink, Rings } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} data-header="blue" className="on-dark relative isolate flex-1 overflow-hidden bg-blue text-white outline-none">
        <Rings className="absolute -right-72 -bottom-96 -z-10 w-[64rem] text-white/12" />
        <section className="container-page py-24 sm:py-32">
          <p className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium">404</p>
          <h1 className="mt-6 max-w-3xl text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.05em] sm:text-7xl">
            No signal <span className="text-mango">here.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/85">The page may have moved, may not be published yet, or the link may be wrong.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" tone="white">
              Back to home
            </ButtonLink>
            <ButtonLink href="/insights" tone="outline" arrow={false}>
              Read the news
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
