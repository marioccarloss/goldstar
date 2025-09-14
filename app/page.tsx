import { Hero } from "@/components/home/hero";
import { WorkItems } from "@/components/home/work-items";
import { WorkSection } from "@/components/home/work-section";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  // Cargar contenido en el servidor para pintar el Hero inmediatamente (mejor LCP)
  const initialContent = await getContent();

  return (
    <>
      <Hero initialContent={initialContent} />
      <WorkSection initialContent={initialContent} />
      <WorkItems initialContent={initialContent} />
    </>
  );
}
