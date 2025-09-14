"use client";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// Add a normalizer to guarantee safe defaults for deeply nested fields used in rendering
function normalizeContent(raw: any) {
  const defaults = {
    contact: {
      hero: { title: "", subtitle: "" },
      info: { phone: "", email: "", location: "", followUs: "Follow us" },
      form: {
        labels: { name: "Name", email: "Email", phone: "Phone", message: "Message" },
        placeholders: { name: "Your name", email: "you@example.com", phone: "Your phone", message: "Your message" },
        button: { label: "Send", submitting: "Sending..." },
        errors: { nameRequired: "Name is required", emailRequired: "Email is required", emailInvalid: "Invalid email" },
        toast: { success: "Message sent!" },
      },
      hours: { title: "Business hours", description: "" },
    },
  };

  const c = raw ?? {};
  const contact = c.contact ?? {};
  const form = contact.form ?? {};

  return {
    ...c,
    contact: {
      ...defaults.contact,
      ...contact,
      hero: { ...defaults.contact.hero, ...(contact.hero ?? {}) },
      info: { ...defaults.contact.info, ...(contact.info ?? {}) },
      form: {
        ...defaults.contact.form,
        ...form,
        labels: { ...defaults.contact.form.labels, ...(form.labels ?? {}) },
        placeholders: { ...defaults.contact.form.placeholders, ...(form.placeholders ?? {}) },
        button: { ...defaults.contact.form.button, ...(form.button ?? {}) },
        errors: { ...defaults.contact.form.errors, ...(form.errors ?? {}) },
        toast: { ...defaults.contact.form.toast, ...(form.toast ?? {}) },
      },
      hours: { ...defaults.contact.hours, ...(contact.hours ?? {}) },
    },
  };
}

export default function ContactClient({ initialContent }: { initialContent?: any }) {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [content, setContent] = useState<any>(initialContent ? normalizeContent(initialContent) : null);

  useEffect(() => {
    if (!initialContent) {
      const fetchContent = async () => {
        const c = await getContent();
        setContent(c ? normalizeContent(c) : null);
      };
      fetchContent();
    }
  }, [initialContent]);

  if (!content) return null;

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = content.contact.form.errors.nameRequired;
    if (!formData.email.trim()) newErrors.email = content.contact.form.errors.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = content.contact.form.errors.emailInvalid;
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success(content.contact.form.toast.success);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const textItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex min-h-svh w-full items-center overflow-x-hidden bg-[#f6be00] px-6 text-black">
        <div className="mx-auto w-full max-w-[1400px] pt-40 pb-28 lg:px-[4rem]">
          <div className="relative grid items-start gap-16 lg:grid-cols-2">
            <motion.div
              className="z-10 flex flex-col gap-8 text-center lg:text-left"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="leading-none font-extrabold"
                style={{ fontSize: "clamp(2.5rem, 5vw, 72px)" }}
                variants={textItemVariants}
              >
                {content.contact.hero.title}
              </motion.h1>
              <motion.p
                className="lg:max-w-[521px]"
                style={{ fontSize: "clamp(1rem, 1.5vw, 22px)" }}
                variants={textItemVariants}
              >
                {content.contact.hero.subtitle}
              </motion.p>
              <motion.div className="flex flex-wrap gap-4 md:mx-auto lg:mx-0 lg:flex-col" variants={textItemVariants}>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-black" />
                  <span className="text-lg font-medium">{content.contact.info.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-black" />
                  <span className="text-lg font-medium">{content.contact.info.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-black" />
                  <span className="text-lg font-medium">{content.contact.info.location}</span>
                </div>
              </motion.div>
              <motion.div className="flex flex-col gap-4" variants={textItemVariants}>
                <h3 className="text-xl font-bold">{content.contact.info.followUs}</h3>
                <div className="mx-auto flex gap-4 lg:mx-0">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform rounded-full bg-white p-3 text-black transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:shadow-lg"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform rounded-full bg-white p-3 text-black transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:shadow-lg"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform rounded-full bg-white p-3 text-black transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:shadow-lg"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform rounded-full bg-white p-3 text-black transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:shadow-lg"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="z-10 flex flex-col gap-6"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.form onSubmit={handleSubmit} className="flex flex-col gap-6" variants={textItemVariants}>
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <motion.div className="flex flex-col gap-2" variants={textItemVariants}>
                  <label htmlFor="name" className="text-lg font-semibold">
                    {content.contact.form.labels.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`h-16 rounded-2xl border-2 bg-transparent px-6 text-lg font-medium text-black placeholder-black/60 transition-all duration-300 focus:ring-0 focus:outline-none ${errors.name ? "border-red-500 focus:border-red-500" : "border-black/30 hover:border-black/50 focus:border-black"}`}
                    placeholder={content.contact.form.placeholders.name}
                    required
                  />
                  {errors.name && <span className="text-sm font-medium text-red-600">{errors.name}</span>}
                </motion.div>
                <motion.div className="flex flex-col gap-2" variants={textItemVariants}>
                  <label htmlFor="email" className="text-lg font-semibold">
                    {content.contact.form.labels.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-16 rounded-2xl border-2 bg-transparent px-6 text-lg font-medium text-black placeholder-black/60 transition-all duration-300 focus:ring-0 focus:outline-none ${errors.email ? "border-red-500 focus:border-red-500" : "border-black/30 hover:border-black/50 focus:border-black"}`}
                    placeholder={content.contact.form.placeholders.email}
                    required
                  />
                  {errors.email && <span className="text-sm font-medium text-red-600">{errors.email}</span>}
                </motion.div>
                <motion.div className="flex flex-col gap-2" variants={textItemVariants}>
                  <label htmlFor="phone" className="text-lg font-semibold">
                    {content.contact.form.labels.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-16 rounded-2xl border-2 border-black/30 bg-transparent px-6 text-lg font-medium text-black placeholder-black/60 transition-all duration-300 hover:border-black/50 focus:border-black focus:ring-0 focus:outline-none"
                    placeholder={content.contact.form.placeholders.phone}
                  />
                </motion.div>
                <motion.div className="flex flex-col gap-2" variants={textItemVariants}>
                  <label htmlFor="message" className="text-lg font-semibold">
                    {content.contact.form.labels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-40 resize-y rounded-2xl border-2 border-black/30 bg-transparent px-6 py-4 text-lg font-medium text-black placeholder-black/60 transition-all duration-300 hover:border-black/50 focus:border-black focus:ring-0 focus:outline-none"
                    placeholder={content.contact.form.placeholders.message}
                  />
                </motion.div>
                <motion.div variants={textItemVariants}>
                  <Button
                    type="submit"
                    className="h-14 rounded-2xl bg-black px-6 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-black/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? content.contact.form.button.submitting : content.contact.form.button.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
