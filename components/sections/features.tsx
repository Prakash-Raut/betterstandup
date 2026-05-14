import { Award, Brain, Terminal } from "lucide-react";
import { FeatureCard } from "@/components/feature-card";

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="max-w-2xl mb-12">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary mb-3">
          {/* biome-ignore lint/suspicious/noCommentText: visible eyebrow label styled to look like a code comment */}
          // What it does
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight">
          From sync to ship,
          <br />
          <span className="italic text-muted-foreground">
            without the typing.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FeatureCard
          icon={<Brain className="h-5 w-5" />}
          title="Stand-up Intelligence"
          body="Captures both mic and system audio. Automatically identifies your specific tasks and team blockers."
        />
        <FeatureCard
          icon={<Terminal className="h-5 w-5" />}
          title="CLI & Claude Sync"
          body="Automatically updates your local CLAUDE.md or context files. Your IDE knows your priorities before you even start typing."
        />
        <FeatureCard
          icon={<Award className="h-5 w-5" />}
          title="The Appraisal Vault"
          body="Every contribution is indexed. Generate high-impact monthly reports for your manager and appraisals in one click."
        />
      </div>
    </section>
  );
}
