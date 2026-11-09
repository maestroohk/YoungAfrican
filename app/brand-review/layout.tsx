import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Brand directions",
  robots: { index: false, follow: false },
};

export default function BrandReviewLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return children;
}
