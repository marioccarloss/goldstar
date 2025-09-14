import { getContent } from "@/lib/content";
import ContactClient from "@/components/contact/contact-client";

export const revalidate = 60;

export default async function Contact() {
  const content = await getContent();
  return <ContactClient initialContent={content} />;
}
