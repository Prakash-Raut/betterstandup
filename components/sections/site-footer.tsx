import { Terminal } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-md bg-primary flex items-center justify-center">
            <Terminal className="h-3 w-3 text-primary-foreground" />
          </span>
          <span className="font-serif text-sm font-semibold">
            BetterStandup
          </span>
          <span className="font-mono text-[11px] text-muted-foreground ml-2">
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link
            href="#"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            GitHub
          </Link>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="font-mono text-[10px] uppercase tracking-wider">
            Built by an Engineer
          </span>
        </div>
      </div>
    </footer>
  );
}
