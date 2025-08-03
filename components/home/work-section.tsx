import type React from "react"
import Image from "next/image"

const GridItem = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <div className={`relative overflow-hidden rounded-lg shadow-lg h-full ${className}`}>{children}</div>
}

const TextBlock = ({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle: string
  className?: string
}) => {
  return (
    <div className={`flex h-full flex-col justify-end p-6 text-white ${className}`}>
      <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
      <p className="text-base md:text-lg">{subtitle}</p>
    </div>
  )
}

export function WorkSection() {
  return (
    <section className="relative w-full bg-white py-24">
      <div className="max-w-[1400px] w-full mx-auto px-6 min-h-svh flex items-center">
        <div className="relative w-full">
          <h2
            className="absolute -top-12 md:-top-24 left-1/2 -translate-x-1/2 font-extrabold text-black text-center leading-none z-10 w-full pointer-events-none"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
          >
            WE WORK
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
            <div className="col-span-1 flex flex-col gap-4">
              <GridItem className="bg-[#E85D2A] min-h-[200px]">
                <TextBlock title="Building Beauty" subtitle="- in Every Grain" />
              </GridItem>
              <GridItem className="min-h-[200px]">
                <Image
                  src="/images/work-worker-front.png"
                  alt="Worker in safety vest"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
              <GridItem className="bg-[#4A6B4D] min-h-[200px]">
                <TextBlock title="Reliable Repairs" subtitle="for Leaks, Pipes & More" />
              </GridItem>
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <GridItem className="min-h-[416px]">
                <Image
                  src="/images/work-electrician-panel.png"
                  alt="Electrician working on a panel"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
              <GridItem className="min-h-[200px]">
                <Image
                  src="/images/work-coiled-cord.png"
                  alt="Coiled electrical cord"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <GridItem className="min-h-[200px]">
                <Image
                  src="/images/work-screwdriver.png"
                  alt="Hand using a screwdriver"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
              <GridItem className="bg-[#4285F4] min-h-[200px]">
                <TextBlock title="Electrical" subtitle="- Safe Power" />
              </GridItem>
              <GridItem className="min-h-[200px]">
                <Image
                  src="/images/work-ceiling-worker.png"
                  alt="Worker on ceiling wiring"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <GridItem className="min-h-[416px]">
                <Image
                  src="/images/work-worker-side.png"
                  alt="Worker in hard hat"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </GridItem>
              <GridItem className="bg-[#1E3A3A] min-h-[200px]">
                <TextBlock title="HVAC" subtitle="- Comfort Installs" />
              </GridItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
