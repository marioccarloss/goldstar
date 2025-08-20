"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface WorkItemData {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const workItemsData: WorkItemData[] = [
  {
    number: "01",
    title: "Trust",
    description: "Certified handyman pros for trusted, high-quality home repairs. Contact us today!",
    image: "/images/fontanero.png", // Placeholder, replace with actual image from the screenshot
    imageAlt: "A certified handyman ensuring trust.",
  },
  {
    number: "02",
    title: "Reliability",
    description: "Count on our reliable team for fast, on-time home repair service. Book now!",
    image: "/images/plumbing-repair.jpg", // Placeholder, replace with actual image from the screenshot
    imageAlt: "A reliable plumber fixing a sink.",
  },
  {
    number: "03",
    title: "Expertise",
    description: "Expert handyman skills for precise, professional home fixes. Get started today!",
    image: "/images/heating-service-1.jpg", // Placeholder, replace with actual image from the screenshot
    imageAlt: "A handyman demonstrating expertise with a power tool.",
  },
];

export function WorkItems() {
  const animationRef = useRef(null);
  const isInView = useInView(animationRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={animationRef} className="bg-white text-black">
      <div className="mx-auto max-w-[1430px] px-6 py-16 sm:py-24 2xl:px-4">
        <motion.div
          className="bg-[#F97316] px-4 py-12 sm:px-8"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-[1000px] text-left">
            <div className="mb-4 flex items-center gap-x-3">
              <div className="h-3 w-3 bg-black" />
              <p className="text-sm font-semibold tracking-widest text-black">WHY CHOOSE US</p>
            </div>
            <h2
              className="text-4xl leading-none font-bold text-black sm:text-5xl md:text-6xl"
              style={{ lineHeight: "1.2" }}
            >
              Every Home Task
              <br />
              Done Right
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flow-root">
            <ul className="-my-8">
              {workItemsData.map((item) => (
                <motion.li key={item.number} className="border-b border-gray-200 py-8" variants={itemVariants}>
                  <div className="grid grid-cols-1 items-center gap-y-6 md:grid-cols-12 md:gap-x-8">
                    <div className="text-2xl font-light text-gray-500 md:col-span-1">{item.number}</div>
                    <div className="md:col-span-3">
                      <h3 className="text-3xl font-bold text-black sm:text-4xl">{item.title}</h3>
                    </div>
                    <div className="md:col-span-5">
                      <p className="text-base text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex justify-center md:col-span-3 md:justify-end">
                      <div className="relative h-28 w-40 overflow-hidden rounded-lg shadow-md sm:h-32 sm:w-48">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 160px, 192px"
                        />
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
