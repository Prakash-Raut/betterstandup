import { WaitlistForm } from "@/components/sections/waitlist-form";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-12 pb-16 md:pt-20 md:pb-24 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          macOS · Menu Bar Utility
        </span>
      </div>

      <h1 className="font-serif text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-foreground">
        Turn Stand-ups
        <br />
        <span className="italic text-primary">into Code.</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
        The background utility that captures team syncs, extracts your action
        items, and syncs them directly to your CLI. Built for the modern
        engineer.
      </p>

      <WaitlistForm />
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        No spam. Just a single email when we ship.
      </p>
    </section>
  );
}
