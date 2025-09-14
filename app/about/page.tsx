import { getContent } from "@/lib/content";
import AboutClient from "@/components/about/about-client";

export const revalidate = 60;

export default async function AboutPage() {
  const content = await getContent();
  return <AboutClient initialContent={content} />;
}
