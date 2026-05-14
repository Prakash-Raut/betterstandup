import { CheckCircle2, Mic, Radio, Square, Vault } from "lucide-react";

export function MenuBarPopover() {
  return (
    <div className="relative w-85 rounded-xl bg-card border border-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 h-9 border-b border-border bg-secondary/60">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        </div>
        <span className="font-serif text-[13px] font-medium text-foreground/80">
          BetterStandup
        </span>
        <div className="w-12" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0.5 px-2 pt-2 pb-1 border-b border-border/60">
        <span className="flex-1 text-center text-[12px] font-medium py-1.5 rounded-md bg-primary text-primary-foreground shadow-sm">
          Capture
        </span>
        <span className="flex-1 text-center text-[12px] font-medium py-1.5 rounded-md text-muted-foreground">
          Summary
        </span>
        <span className="flex-1 text-center text-[12px] font-medium py-1.5 rounded-md text-muted-foreground inline-flex items-center justify-center gap-1">
          <Vault className="h-3 w-3" /> Vault
        </span>
      </div>

      {/* Capture body */}
      <div className="flex flex-col items-center justify-between px-5 py-6 h-95">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          <Radio className="h-3 w-3 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider">
            Live
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative h-28 w-28 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-primary/15 animate-ping" />
            <span className="absolute inset-3 rounded-full bg-primary/20" />
            <div className="relative h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Mic className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <div className="flex items-end gap-1 h-10">
            {[
              0.4, 0.7, 1, 0.5, 0.85, 0.6, 0.95, 0.45, 0.75, 0.55, 0.9, 0.4,
            ].map((h, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars, never reordered
                key={i}
                className="w-1 rounded-full bg-primary/70 animate-pulse"
                style={{
                  height: `${h * 100}%`,
                  animationDelay: `${i * 80}ms`,
                  animationDuration: "900ms",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-primary" />
            <p className="font-mono text-[11px] text-muted-foreground">
              System + Mic Audio
            </p>
          </div>
          <p className="font-mono text-xs text-foreground tabular-nums">
            00:12:43
          </p>
        </div>

        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2.5 text-[13px] font-medium hover:bg-primary/90 transition shadow-sm"
        >
          <Square className="h-3.5 w-3.5 fill-current" />
          End Stand-up
        </button>
      </div>
    </div>
  );
}
