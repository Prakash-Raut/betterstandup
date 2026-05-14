import { MenuBarPopover } from "@/components/sections/menu-bar-popover";

export function Showcase() {
  return (
    <section id="showcase" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="relative rounded-2xl border border-border bg-linear-to-br from-secondary/60 to-accent/40 p-8 md:p-16 overflow-hidden">
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative flex justify-center">
          <MenuBarPopover />
        </div>

        <p className="relative mt-8 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Lives in your menu bar · Always one keystroke away
        </p>
      </div>
    </section>
  );
}
