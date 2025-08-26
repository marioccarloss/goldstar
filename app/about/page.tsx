"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1430px] px-6 py-16 sm:py-24 2xl:px-4 mt-20 py-20">
        <motion.div
          className="relative bg-gradient-to-br from-[#F6BE00] to-[#FFA500] overflow-visible min-h-[500px] md:min-h-[600px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Typography - Following reference layout */}
          <div className="relative p-8 md:p-16 lg:p-20 h-full flex flex-col justify-center">
            <div className="relative flex items-center justify-center">
              <motion.div
                className="relative text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem] font-black text-[#4A2C2A] tracking-tight"
                  style={{ lineHeight: 1 }}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                >
                  Gold
                </motion.h1>
                <motion.h1
                  className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem] font-black text-[#4A2C2A] tracking-tight -mt-6 md:-mt-8 lg:-mt-10 mb-16 md:mb-20 lg:mb-24"
                  style={{ lineHeight: 1 }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                >
                  Star
                </motion.h1>
              </motion.div>

              <motion.div
                className="absolute top-0 right-0 md:right-8 lg:right-16 bg-[#E8B4E3] rounded-2xl p-4 md:p-6 shadow-xl z-10"
                initial={{ x: 200, y: -100, opacity: 0, rotate: 15 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8B2F8B]">15+</div>
                <div className="text-sm md:text-base font-medium text-[#8B2F8B] whitespace-nowrap">
                  Years of Excellence
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-4 md:-left-8 bg-[#FFB366] rounded-2xl p-4 md:p-6 shadow-xl z-10"
                initial={{ x: -200, opacity: 0, rotate: -15 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8B4513]">500+</div>
                <div className="text-sm md:text-base font-medium text-[#8B4513] whitespace-nowrap">Happy Customers</div>
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#B8E6FF] rounded-2xl p-4 md:p-6 shadow-xl z-10"
                initial={{ y: 200, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E5A8A]">24/7</div>
                <div className="text-sm md:text-base font-medium text-[#1E5A8A] whitespace-nowrap">
                  Emergency Service
                </div>
              </motion.div>
            </div>

            <motion.p
              className="absolute bottom-8 left-8 right-8 text-center text-lg md:text-xl font-medium text-[#4A2C2A] max-w-3xl mx-auto mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Your trusted plumbing professionals, delivering reliable solutions for every home repair need in Vancouver
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="mt-32 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 tracking-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#F6BE00] to-[#FFA500] bg-clip-text text-transparent">
                Gold Star
              </span>
              ?
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-[#F6BE00] to-[#FFA500] mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 2 }}
            />
          </div>

          {/* Three Pillars Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {/* Trust Pillar */}
            <motion.div
              className="group relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative bg-gradient-to-br from-[color:var(--trust-accent)] to-white p-8 lg:p-10 border border-[color:var(--trust-secondary)]/20 overflow-hidden transition-all duration-500">
                {/* Icon */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[color:var(--trust-primary)] to-[color:var(--trust-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-[color:var(--trust-primary)] mb-4 group-hover:text-[color:var(--trust-secondary)] transition-colors duration-300">
                  Trust
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Certified handyman pros for trusted, high-quality home repairs. Contact us today!
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
              <div className="relative bg-gradient-to-br from-[color:var(--reliability-accent)] to-white p-8 lg:p-10 border border-[color:var(--reliability-secondary)]/20 overflow-hidden transition-all duration-500">
                {/* Icon */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[color:var(--reliability-primary)] to-[color:var(--reliability-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-[color:var(--reliability-primary)] mb-4 group-hover:text-[color:var(--reliability-secondary)] transition-colors duration-300">
                  Reliability
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Count on our reliable team for fast, on-time home repair service. Book now!
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
              <div className="relative bg-gradient-to-br from-[color:var(--expertise-accent)] to-white p-8 lg:p-10 border border-[color:var(--expertise-secondary)]/20 overflow-hidden transition-all duration-500">
                {/* Icon */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[color:var(--expertise-primary)] to-[color:var(--expertise-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-[color:var(--expertise-primary)] mb-4 group-hover:text-[color:var(--expertise-secondary)] transition-colors duration-300">
                  Expertise
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Expert handyman skills for precise, professional home fixes. Get started today!
                </p>
              </div>
            </motion.div>
          </div>

          {/* Call to Action Section */}
          <motion.div
            className="relative bg-gradient-to-r from-[#F6BE00] to-[#FFA500] p-12 lg:p-16 text-center overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

            <div className="relative z-10">
              <h3 className="text-4xl lg:text-5xl font-black text-white mb-6">Ready to Experience Excellence?</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of satisfied customers who trust Gold Star for their home repair needs.
              </p>
              <motion.button
                className="bg-white text-[#F6BE00] px-12 py-4 text-xl font-bold transition-all duration-300 hover:scale-105"
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
  )
}
