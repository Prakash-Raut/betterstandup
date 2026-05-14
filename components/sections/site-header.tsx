import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <div className="flex items-center gap-2">
        <span className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
          <Terminal className="h-4 w-4 text-primary-foreground" />
        </span>
        <span className="font-serif text-xl font-semibold tracking-tight">
          BetterStandup
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <Link
          href="#showcase"
          className="hover:text-foreground transition-colors"
        >
          Product
        </Link>
        <Link
          href="#features"
          className="hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          href="#waitlist"
          className="hover:text-foreground transition-colors"
        >
          Waitlist
        </Link>
      </nav>
      <Link
        href="#waitlist"
        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition"
      >
        Join Waitlist <ArrowRight className="h-3 w-3" />
      </Link>
    </header>
  );
}
