'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface WorkItemData {
  number: string
  title: string
  description: string
  image: string
  imageAlt: string
}

const workItemsData: WorkItemData[] = [
  {
    number: '01',
    title: 'Trust',
    description:
      'Certified handyman pros for trusted, high-quality home repairs. Contact us today!',
    image: '/images/fontanero.png', // Placeholder, replace with actual image from the screenshot
    imageAlt: 'A certified handyman ensuring trust.',
  },
  {
    number: '02',
    title: 'Reliability',
    description:
      'Count on our reliable team for fast, on-time home repair service. Book now!',
    image: '/images/plumbing-repair.jpg', // Placeholder, replace with actual image from the screenshot
    imageAlt: 'A reliable plumber fixing a sink.',
  },
  {
    number: '03',
    title: 'Expertise',
    description:
      'Expert handyman skills for precise, professional home fixes. Get started today!',
    image: '/images/heating-service-1.jpg', // Placeholder, replace with actual image from the screenshot
    imageAlt: 'A handyman demonstrating expertise with a power tool.',
  },
]

export function WorkItems() {
  const animationRef = useRef(null)
  const isInView = useInView(animationRef, { once: true, amount: 0.1 })

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section ref={animationRef} className='bg-white text-black'>
      <div className='max-w-[1430px] mx-auto px-6 2xl:px-4 py-16 sm:py-24'>
        <motion.div
          className='bg-[#F97316] py-12 px-4 sm:px-8'
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className='max-w-[1000px] mx-auto text-left'>
            <div className='flex items-center gap-x-3 mb-4'>
              <div className='w-3 h-3 bg-black' />
              <p className='font-semibold text-sm tracking-widest text-black'>
                WHY CHOOSE US
              </p>
            </div>
            <h2
              className='text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-none'
              style={{ lineHeight: '1.2' }}
            >
              Every Home Task
              <br />
              Done Right
            </h2>
          </div>
        </motion.div>

        <motion.div
          className='mt-12'
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className='flow-root'>
            <ul className='-my-8'>
              {workItemsData.map((item) => (
                <motion.li
                  key={item.number}
                  className='py-8 border-b border-gray-200'
                  variants={itemVariants}
                >
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 items-center'>
                    <div className='md:col-span-1 text-2xl font-light text-gray-500'>
                      {item.number}
                    </div>
                    <div className='md:col-span-3'>
                      <h3 className='text-3xl sm:text-4xl font-bold text-black'>
                        {item.title}
                      </h3>
                    </div>
                    <div className='md:col-span-5'>
                      <p className='text-base text-gray-600'>
                        {item.description}
                      </p>
                    </div>
                    <div className='md:col-span-3 flex justify-center md:justify-end'>
                      <div className='relative w-40 h-28 sm:w-48 sm:h-32 rounded-lg overflow-hidden shadow-md'>
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 160px, 192px'
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
  )
}
