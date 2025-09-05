"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";

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

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Honeypot field

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot validation
    if (honeypot) {
      return; // If the honeypot field has a value, it's a bot
    }

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Form submission logic would go here
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when the user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex min-h-svh w-full items-center overflow-x-hidden bg-[#f6be00] px-6 text-black">
        <div className="mx-auto w-full max-w-[1400px] pt-40 pb-28 lg:px-[4rem]">
          <div className="relative grid items-start gap-16 lg:grid-cols-2">
            {/* Left Column - Social Media & Info */}
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
                Contact Us
              </motion.h1>

              <motion.p
                className="lg:max-w-[521px]"
                style={{ fontSize: "clamp(1rem, 1.5vw, 22px)" }}
                variants={textItemVariants}
              >
                We're here to help 24/7. Contact us for reliable and fast plumbing services in Vancouver.
              </motion.p>

              {/* Contact Info */}
              <motion.div className="flex flex-wrap gap-4 md:mx-auto lg:mx-0 lg:flex-col" variants={textItemVariants}>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-black" />
                  <span className="text-lg font-medium">+1-416-555-0123</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-black" />
                  <span className="text-lg font-medium">info@goldstarplumbing.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-black" />
                  <span className="text-lg font-medium">Vancouver, BC, Canada</span>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div className="flex flex-col gap-4" variants={textItemVariants}>
                <h3 className="text-xl font-bold">Follow Us</h3>
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

            {/* Right Column - Form */}
            <motion.div
              className="z-10 flex flex-col gap-6"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.form onSubmit={handleSubmit} className="flex flex-col gap-6" variants={textItemVariants}>
                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name */}
                <motion.div className="flex flex-col gap-2" variants={textItemVariants}>
                  <label htmlFor="name" className="text-lg font-semibold">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`h-16 rounded-2xl border-2 bg-transparent px-6 text-lg font-medium text-black placeholder-black/60 transition-all duration-300 focus:ring-0 focus:outline-none ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-black/30 hover:border-black/50 focus:border-black"
                    }`}
                    placeholder="Your full name"
                    required
                  />
                  {errors.name && <span className="text-sm font-medium text-red-600">{errors.name}</span>}
                </motion.div>

                {/* Email */}
                <motion.div className="flex flex-col gap-2" variants={textItemVariants}>
                  <label htmlFor="email" className="text-lg font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-16 rounded-2xl border-2 bg-transparent px-6 text-lg font-medium text-black placeholder-black/60 transition-all duration-300 focus:ring-0 focus:outline-none ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-black/30 hover:border-black/50 focus:border-black"
                    }`}
                    placeholder="you@email.com"
                    required
                  />
                  {errors.email && <span className="text-sm font-medium text-red-600">{errors.email}</span>}
                </motion.div>

                {/* Phone */}
                <motion.div className="flex flex-col gap-2" variants={textItemVariants}>
                  <label htmlFor="phone" className="text-lg font-semibold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`h-16 rounded-2xl border-2 border-black/30 bg-transparent px-6 text-lg font-medium text-black placeholder-black/60 transition-all duration-300 hover:border-black/50 focus:border-black focus:ring-0 focus:outline-none`}
                    placeholder="+1 (555) 123-4567"
                  />
                </motion.div>

                {/* Message */}
                <motion.div className="flex flex-col gap-2" variants={textItemVariants}>
                  <label htmlFor="message" className="text-lg font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="resize-none rounded-2xl border-2 border-black/30 bg-transparent px-6 py-4 text-lg font-medium text-black placeholder-black/60 transition-all duration-300 hover:border-black/50 focus:border-black focus:ring-0 focus:outline-none"
                    placeholder="Tell us about your project or plumbing issue..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={textItemVariants}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative h-16 w-full overflow-hidden rounded-2xl bg-white px-6 text-lg text-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gray-100/20 transition-all duration-500 group-hover:from-white/20 group-hover:to-gray-200/30"></div>
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="flex items-center text-[22px] font-bold transition-transform duration-300 group-hover:translate-x-1">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && (
                          <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                        )}
                      </div>
                    </div>
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
