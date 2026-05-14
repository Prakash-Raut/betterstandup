"use client";

import { joinWaitlist } from "@/app/actions/join-waitlist";
import * as amplitude from "@amplitude/unified";
import { Identify } from "@amplitude/unified";
import { ArrowRight } from "lucide-react";
import { useState, useTransition } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <form
        id="waitlist"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email) return;
          setError(null);
          startTransition(async () => {
            const res = await joinWaitlist({ email });
            if (!res.ok) {
              setError(res.error);
              return;
            }
            setJoined(true);
            amplitude.setUserId(email);
            const identifyObj = new Identify();
            identifyObj.set("email", email);
            amplitude.identify(identifyObj);
            amplitude.track("Waitlist Joined", { source: "hero_form" });
          });
        }}
        className="mx-auto mt-8 flex max-w-md flex-col sm:flex-row gap-2"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourstartup.dev"
          disabled={isPending || joined}
          className="flex-1 h-11 rounded-md border border-input bg-card px-4 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isPending || joined}
          className="h-11 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 active:scale-[0.99] transition disabled:opacity-60"
        >
          {isPending
            ? "Joining…"
            : joined
              ? "You're in ✓"
              : "Join the Waitlist"}
          {!isPending && !joined && <ArrowRight className="h-3.5 w-3.5" />}
        </button>
      </form>
      {error && (
        <p className="mx-auto mt-2 max-w-md text-center font-mono text-[11px] text-destructive">
          {error}
        </p>
      )}
    </>
  );
}
