import { getContent } from "@/lib/content";
import ServicesClient from "./services.client";

export const revalidate = 60;

export default async function Services() {
  const content = await getContent();
  return <ServicesClient initialContent={content} />;
}
