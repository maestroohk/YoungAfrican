import { MapPin } from "lucide-react";

export function CoverageForm() {
  return (
    <form action="/contact" method="get" className="min-w-0 rounded-[2rem] bg-white p-6 text-ink shadow-[0_30px_60px_-40px_rgba(58,36,0,0.6)] sm:p-8">
      <input type="hidden" name="service" value="coverage" />
      <label htmlFor="area" className="font-semibold">
        Your village, zone or nearest landmark
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="area"
          name="area"
          required
          maxLength={120}
          autoComplete="address-level2"
          placeholder="For example: Nansana, near the taxi stage"
          className="min-h-12 w-full min-w-0 flex-1 rounded-full border border-line bg-paper px-5 outline-none focus:border-blue focus:bg-white focus:ring-4 focus:ring-blue/15"
        />
        <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue px-6 font-semibold text-white transition-colors hover:bg-blue-deep">
          <MapPin aria-hidden className="size-4" />
          Check my area
        </button>
      </div>
      <p className="mt-3 text-sm text-muted">Live now in Kazo. We will reply with what is planned near you.</p>
    </form>
  );
}
