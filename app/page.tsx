import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Showcase } from "@/components/sections/showcase";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <Hero />
      <Showcase />
      <Features />
      <SiteFooter />
    </div>
  );
}
