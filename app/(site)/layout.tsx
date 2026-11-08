import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isSanityConfigured } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { isEnabled: isPreview } = await draftMode();

  return (
    <>
      <Header />
      {isPreview && (
        <div role="status" className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-[3px] bg-ink py-2 pr-2 pl-4 text-sm font-medium whitespace-nowrap text-ivory shadow-lg">
          Previewing drafts
          <a href="/api/draft-mode/disable" className="rounded-[2px] bg-ivory px-3 py-1.5 text-ink">
            Exit preview
          </a>
        </div>
      )}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
      {isSanityConfigured && <SanityLive includeDrafts={isPreview} />}
      {isPreview && <VisualEditing />}
    </>
  );
}
