"use client";

import { getContent } from "@/lib/content";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const contentData = await getContent();
      setContent(contentData);
    };

    fetchContent();
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto mt-20 max-w-[1430px] px-6 py-20 sm:py-24 2xl:px-4">
        <motion.div
          className="relative min-h-[500px] overflow-visible bg-gradient-to-br from-[#F6BE00] to-[#FFA500] md:min-h-[600px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Typography - Following reference layout */}
          <div className="relative flex h-full flex-col justify-center p-8 md:p-16 lg:p-20">
            <div className="relative flex items-center justify-center">
              <motion.div
                className="relative text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-[8rem] font-black tracking-tight text-[#4A2C2A] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
                  style={{ lineHeight: 1 }}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                >
                  Gold
                </motion.h1>
                <motion.h1
                  className="-mt-6 mb-16 text-[8rem] font-black tracking-tight text-[#4A2C2A] sm:text-[10rem] md:-mt-8 md:mb-20 md:text-[12rem] lg:-mt-10 lg:mb-24 lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
                  style={{ lineHeight: 1 }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                >
                  Star
                </motion.h1>
              </motion.div>

              <motion.div
                className="absolute top-0 right-0 z-10 rounded-2xl bg-[#E8B4E3] p-4 shadow-xl md:right-8 md:p-6 lg:right-16"
                initial={{ x: 200, y: -100, opacity: 0, rotate: 15 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              >
                <div className="text-sm font-medium whitespace-nowrap text-[#8B2F8B] md:text-base">
                  {content.about.stats.years}
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-4 z-10 rounded-2xl bg-[#FFB366] p-4 shadow-xl md:-left-8 md:p-6"
                initial={{ x: -200, opacity: 0, rotate: -15 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
              >
                <div className="text-3xl font-bold text-[#8B4513] md:text-4xl lg:text-5xl">500+</div>
                <div className="text-sm font-medium whitespace-nowrap text-[#8B4513] md:text-base">
                  {content.about.stats.customers}
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform rounded-2xl bg-[#B8E6FF] p-4 shadow-xl md:p-6"
                initial={{ y: 200, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
              >
                <div className="text-3xl font-bold text-[#1E5A8A] md:text-4xl lg:text-5xl">24/7</div>
                <div className="text-sm font-medium whitespace-nowrap text-[#1E5A8A] md:text-base">
                  {content.about.stats.emergency}
                </div>
              </motion.div>
            </div>

            <motion.p
              className="absolute right-8 bottom-8 left-8 mx-auto mt-8 max-w-3xl text-center text-lg font-medium text-[#4A2C2A] md:text-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {content.about.hero.tagline}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.h2
              className="text-foreground mb-6 text-5xl font-black tracking-tight md:text-6xl lg:text-7xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {content.about.whyChoose.titlePrefix}{" "}
              <span className="bg-gradient-to-r from-[#F6BE00] to-[#FFA500] bg-clip-text text-transparent">
                {content.about.whyChoose.titleBrand}
              </span>
              ?
            </motion.h2>
            <motion.div
              className="mx-auto h-1 w-24 bg-gradient-to-r from-[#F6BE00] to-[#FFA500]"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 2 }}
            />
          </div>

          {/* Three Pillars Grid */}
          <div className="mb-20 grid gap-8 md:grid-cols-3 lg:gap-12">
            {/* Trust Pillar */}
            <motion.div
              className="group relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden border border-[color:var(--trust-secondary)]/20 bg-gradient-to-br from-[color:var(--trust-accent)] to-white p-8 transition-all duration-500 lg:p-10">
                {/* Icon */}
                <div className="relative mb-8">
                  <div className="flex h-20 w-20 items-center justify-center bg-gradient-to-br from-[color:var(--trust-primary)] to-[color:var(--trust-secondary)] transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-[color:var(--trust-primary)] transition-colors duration-300 group-hover:text-[color:var(--trust-secondary)] lg:text-3xl">
                  {content.about.whyChoose.pillars[0].title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  {content.about.whyChoose.pillars[0].description}
                </p>
              </div>
            </motion.div>

            {/* Reliability Pillar */}
            <motion.div
              className="group relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden border border-[color:var(--reliability-secondary)]/20 bg-gradient-to-br from-[color:var(--reliability-accent)] to-white p-8 transition-all duration-500 lg:p-10">
                {/* Icon */}
                <div className="relative mb-8">
                  <div className="flex h-20 w-20 items-center justify-center bg-gradient-to-br from-[color:var(--reliability-primary)] to-[color:var(--reliability-secondary)] transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-[color:var(--reliability-primary)] transition-colors duration-300 group-hover:text-[color:var(--reliability-secondary)] lg:text-3xl">
                  {content.about.whyChoose.pillars[1].title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  {content.about.whyChoose.pillars[1].description}
                </p>
              </div>
            </motion.div>

            {/* Expertise Pillar */}
            <motion.div
              className="group relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden border border-[color:var(--expertise-secondary)]/20 bg-gradient-to-br from-[color:var(--expertise-accent)] to-white p-8 transition-all duration-500 lg:p-10">
                {/* Icon */}
                <div className="relative mb-8">
                  <div className="flex h-20 w-20 items-center justify-center bg-gradient-to-br from-[color:var(--expertise-primary)] to-[color:var(--expertise-secondary)] transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-[color:var(--expertise-primary)] transition-colors duration-300 group-hover:text-[color:var(--expertise-secondary)] lg:text-3xl">
                  {content.about.whyChoose.pillars[2].title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  {content.about.whyChoose.pillars[2].description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Call to Action Section */}
          <motion.div
            className="relative overflow-hidden bg-gradient-to-r from-[#F6BE00] to-[#FFA500] p-12 text-center lg:p-16"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-white/5" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-24 translate-y-24 rounded-full bg-white/5" />

            <div className="relative z-10">
              <h3 className="mb-6 text-4xl font-black text-white lg:text-5xl">Ready to Experience Excellence?</h3>
              <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white/90">
                Join hundreds of satisfied customers who trust Gold Star for their home repair needs.
              </p>
              <motion.button
                className="bg-white px-12 py-4 text-xl font-bold text-[#F6BE00] transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Your Free Quote Today
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
