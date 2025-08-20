import { Hero } from "@/components/home/hero";
import { WorkItems } from "@/components/home/work-items";
import { WorkSection } from "@/components/home/work-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <WorkItems />
    </>
  );
}
