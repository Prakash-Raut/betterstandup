"use client";

import { Tabs } from "@base-ui/react/tabs";
import {
  CheckCircle2,
  FileText,
  Folder,
  Mic,
  Radio,
  Square,
  SquareCheckBig,
} from "lucide-react";
import { useState } from "react";

const TAB_TRIGGER_CLASS =
  "flex-1 text-center text-[12px] font-medium py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

const ACTION_ITEMS = [
  "Refactor auth middleware to httpOnly cookies",
  "Spike on websocket fan-out for live cursors",
  "Review Maya's PR on the billing webhook",
  "Draft RFC for the new feature flag system",
];

const VAULT_GROUPS = [
  {
    label: "TODAY · THU MAY 14",
    items: ["Shipped auth refactor (ENG-241)", "Reviewed billing webhook PR"],
  },
  {
    label: "WED MAY 13",
    items: ["Drafted feature-flag RFC", "Pair-debugged stale cache bug"],
  },
  {
    label: "TUE MAY 12",
    items: ["Migrated CI to Bun", "1:1 with Maya — Q3 planning"],
  },
  {
    label: "MON MAY 11",
    items: ["Deployed v0.4.2 to staging", "Reviewed onboarding copy"],
  },
];

export function MenuBarPopover() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

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

      <Tabs.Root defaultValue="capture">
        <Tabs.List className="flex items-center gap-0.5 px-2 pt-2 pb-1 border-b border-border/60">
          <Tabs.Tab value="capture" className={TAB_TRIGGER_CLASS}>
            Capture
          </Tabs.Tab>
          <Tabs.Tab value="summary" className={TAB_TRIGGER_CLASS}>
            Summary
          </Tabs.Tab>
          <Tabs.Tab value="vault" className={TAB_TRIGGER_CLASS}>
            Vault
          </Tabs.Tab>
        </Tabs.List>

        {/* Capture panel */}
        <Tabs.Panel value="capture">
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
        </Tabs.Panel>

        {/* Summary panel */}
        <Tabs.Panel value="summary">
          <div className="flex flex-col px-5 py-5 h-95 gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-[15px] font-medium text-foreground">
                My Action Items
              </h3>
              <span className="font-mono text-[10px] text-primary">
                4 extracted
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              {ACTION_ITEMS.map((item, i) => {
                const isChecked = checked.has(i);
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      className="flex items-center gap-3 text-left w-full"
                    >
                      {isChecked ? (
                        <SquareCheckBig className="h-4 w-4 shrink-0 text-primary" />
                      ) : (
                        <Square className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                      )}
                      <span
                        className={
                          isChecked
                            ? "text-[13px] text-muted-foreground line-through"
                            : "text-[13px] text-foreground"
                        }
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-secondary/40">
              <Folder className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-[12px] text-muted-foreground">
                ~/dev/your-app
              </span>
            </div>

            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2.5 text-[13px] font-medium hover:bg-primary/90 transition shadow-sm"
            >
              <FileText className="h-3.5 w-3.5" />
              Update CLAUDE.md
            </button>
          </div>
        </Tabs.Panel>

        {/* Vault panel */}
        <Tabs.Panel value="vault">
          <div className="flex flex-col px-5 pt-5 pb-2 h-95 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <SquareCheckBig className="h-4 w-4 text-foreground" />
                <h3 className="font-serif text-[15px] font-medium text-foreground">
                  Tasks this week
                </h3>
              </div>
              <span className="font-mono text-[10px] text-primary">
                for appraisal
              </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 -mr-1">
              {VAULT_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-3 mb-2 first:mt-0">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 py-1">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                      <p className="text-[13px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}
