"use client"

import type React from "react"
import Image from "next/image"
import { ArrowUpRight } from "../icons/arrow-up-right"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const GridItem = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <div className={`group relative overflow-hidden shadow-lg h-full ${className}`}>{children}</div>
}

const TextBlock = ({
  title,
  className,
}: {
  title: string
  className?: string
}) => {
  return (
    <div className={`flex h-full flex-col justify-between p-6 text-white ${className}`}>
      <ArrowUpRight className="self-end transition-transform duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[4px]" />
      <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
    </div>
  )
}

export function WorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={ref} className="relative w-full bg-white py-24">
      <div className="max-w-[1400px] w-full mx-auto px-6 min-h-svh flex items-center">
        <div className="relative w-full">
          <h2
            className="absolute -top-12 md:-top-32 left-1/2 -translate-x-1/2 font-extrabold text-gray-200 text-center leading-none z-0 w-full pointer-events-none"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
          >
            WE WORK
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="col-span-1 flex flex-col gap-4" variants={itemVariants}>
              <GridItem className="bg-[#F6BE00] min-h-[200px]">
                <TextBlock title="Plumbing Services" />
              </GridItem>
              <GridItem className="min-h-[200px]">
                <Image
                  src="/images/plumbing-repair-2.jpg"
                  alt="Plumbing repair 2"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
              <GridItem className="bg-[#4A6B4D] min-h-[200px]">
                <TextBlock title="Drainge Services" />
              </GridItem>
            </motion.div>
            <motion.div className="col-span-1 flex flex-col gap-4" variants={itemVariants}>
              <GridItem className="min-h-[416px]">
                <Image
                  src="/images/plumbing-repair.jpg"
                  alt="Plumbing repair"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
              <GridItem className="min-h-[200px]">
                <Image
                  src="/images/drainge-service.jpg"
                  alt="Placeholder image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
            </motion.div>
            <motion.div className="col-span-1 flex flex-col gap-4" variants={itemVariants}>
              <GridItem className="min-h-[200px]">
                <Image
                  src="/images/home-renovations.jpg"
                  alt="Placeholder image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
              <GridItem className="bg-[#4285F4] min-h-[200px]">
                <TextBlock title="Home Renovations" />
              </GridItem>
              <GridItem className="min-h-[200px]">
                <Image
                  src="/images/heating-service-2.jpg"
                  alt="Placeholder image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
            </motion.div>
            <motion.div className="col-span-1 flex flex-col gap-4" variants={itemVariants}>
              <GridItem className="min-h-[416px]">
                <Image
                  src="/images/heating-service-1.jpg"
                  alt="Placeholder image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
              <GridItem className="bg-[#E85D2A] min-h-[200px]">
                <TextBlock title="Heating Services" />
              </GridItem>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
