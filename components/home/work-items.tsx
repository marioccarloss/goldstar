"use client";

import { getContent, subscribeToContent } from "@/lib/content";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface WorkItemData {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export function WorkItems({ initialContent }: { initialContent?: any }) {
  const [content, setContent] = useState<any>(initialContent ?? null);

  useEffect(() => {
    if (!initialContent) {
      const fetchData = async () => {
        const c = await getContent();
        setContent(c);
      };
      fetchData();
    }
  }, [initialContent]);

  // Suscripción en tiempo real
  useEffect(() => {
    const cleanup = subscribeToContent((data) => setContent(data));
    return cleanup;
  }, []);

  const workItemsData: WorkItemData[] = (content?.home?.choose?.items ?? []).map((i: any, idx: number) => ({
    number: i.number,
    title: i.title,
    description: i.description,
    image:
      idx === 0
        ? "/certified-handyman-with-uniform-and-credentials-ba.png"
        : idx === 1
          ? "/handyman-checking-watch-arriving-with-toolbox-punctu.png"
          : "/expert-handyman-using-specialized-tools-showing-pr.png",
    imageAlt: i.imageAlt,
  }));

  return <WorkItemsComponent workItemsData={workItemsData} content={content} />;
}

function WorkItemsComponent({ workItemsData, content }: { workItemsData: WorkItemData[]; content: any }) {
  // Use the list container as reference for in-view (triggers earlier)
  const listRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(listRef, { once: true, amount: 0.01 });

  // Force visible on small screens so it never looks like it "didn't load"
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768); // < md
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-[1430px] px-6 py-16 sm:py-24 2xl:px-4">
        <motion.div
          className="bg-[#F97316] px-4 py-12 sm:px-8"
          initial={{ opacity: 0, y: -50 }}
          animate={isMobile ? { opacity: 1, y: 0 } : isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-[1000px] text-left">
            <div className="mb-4 flex items-center gap-x-3">
              <div className="h-3 w-3 bg-black" />
              <p className="text-sm font-semibold tracking-widest text-black">{content?.home?.choose?.badge}</p>
            </div>
            <h2
              className="text-4xl leading-none font-bold text-black sm:text-5xl md:text-6xl"
              style={{ lineHeight: "1.2" }}
            >
              {content?.home?.choose?.title?.l1}
              <br />
              {content?.home?.choose?.title?.l2}
            </h2>
          </div>
        </motion.div>

        <motion.div
          ref={listRef}
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isMobile ? "visible" : isInView ? "visible" : "hidden"}
        >
          <div className="flow-root">
            <ul className="-my-8">
              {workItemsData.map((item) => (
                <motion.li key={item.number} className="border-b border-gray-200 py-8">
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
                          src={item.image || "/placeholder.svg"}
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
