import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Young African Internet handles the personal information you send through the website.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "What we collect",
    text: "When you send an enquiry we receive your name, email address, the topic you choose and your message. Your phone number and organisation are optional. We do not ask for, and you should never send, passwords, PINs, private keys or payment details.",
  },
  {
    title: "Why we use it",
    text: "Only to read and reply to your enquiry and to follow up on it. We do not sell your details or use them for marketing without your permission.",
  },
  {
    title: "Where it goes",
    text: "Enquiries are delivered to Young African Internet by email through an email delivery provider. Articles and site content are managed in Sanity, which does not receive your enquiry.",
  },
  {
    title: "How long we keep it",
    text: "We keep enquiries only as long as we need them to respond and follow up, unless you ask us to delete them sooner.",
  },
  {
    title: "Cookies and tracking",
    text: "The public website does not use advertising or analytics cookies. A preview cookie is set only for editors who sign in to review unpublished content.",
  },
  {
    title: "Your choices",
    text: "You can ask to see, correct or delete the information you have sent us, in line with Uganda's Data Protection and Privacy Act, 2019. Use the contact form and choose “Something else”.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        tone="paper"
        eyebrow="Privacy"
        title="Your information, handled plainly."
        intro="This notice explains what happens to the details you send through this website. It will be reviewed as the company completes its registration."
      />
      <section className="pb-20 lg:pb-28">
        <div className="container-page">
          <div className="max-w-3xl rounded-[2rem] bg-white p-6 sm:p-10">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-line py-6 first:pt-0 last:border-0 last:pb-0">
                <h2 className="text-xl font-semibold tracking-[-0.02em]">{section.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{section.text}</p>
              </div>
            ))}
            <p className="mt-8 text-sm text-muted">
              Questions about privacy?{" "}
              <Link href="/contact?service=other" className="font-semibold text-blue underline underline-offset-4">
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
