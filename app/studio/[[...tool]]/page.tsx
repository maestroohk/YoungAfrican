import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-ink p-6 text-white">
        <div className="max-w-lg">
          <p className="font-mono text-xs tracking-[0.14em] text-lime uppercase">Content studio</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em]">Sanity is not connected yet.</h1>
          <p className="mt-4 leading-relaxed text-mist">
            Set <code className="text-white">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code className="text-white">NEXT_PUBLIC_SANITY_DATASET</code> in <code className="text-white">.env.local</code>, then
            restart the server. The README explains the full setup.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
