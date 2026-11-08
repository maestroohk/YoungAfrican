import type { Metadata } from "next";
import { ButtonLink, Label } from "@/components/ui";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="container-page py-20 sm:py-28">
          <div className="border-t-2 border-ink pt-6 lg:ml-[25%] lg:w-3/4">
            <Label>404</Label>
            <h1 className="mt-5 max-w-2xl font-serif text-[2.6rem] leading-[1.05] tracking-[-0.02em] sm:text-[3.6rem]">
              We couldn’t find that page.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-stone">It may have moved, it may not be published yet, or the link may be wrong.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/">Back to home</ButtonLink>
              <ButtonLink href="/insights" variant="outline">
                Browse insights
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
