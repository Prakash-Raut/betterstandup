import type { ReactNode } from "react";

export function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-semibold mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
