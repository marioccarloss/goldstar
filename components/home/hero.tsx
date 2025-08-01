import type React from "react"
import Image from "next/image"
import { Star, ArrowRight, Grip, Menu } from "lucide-react"
import { Logo } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"

const NavLink = ({ children }: { children: React.ReactNode }) => (
  <a href="#" className="text-white hover:text-[#fec52c] transition-colors text-lg">
    {children}
  </a>
)

export const Hero = () => {
  return (
    <div className="w-full bg-[#f6be00] text-black overflow-x-hidden">
      <header className="bg-black">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            <NavLink>Home</NavLink>
            <NavLink>Services</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Contact</NavLink>
          </div>
          <div className="hidden md:block">
            <Grip className="text-white w-8 h-8" />
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="text-white w-6 h-6" />
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna de Texto */}
          <div className="flex flex-col gap-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-[#d0f5da] p-2 rounded-md self-center lg:self-start">
              <Star className="w-5 h-5 text-[#eb9b4a]" fill="#eb9b4a" />
              <span className="font-medium text-sm text-black">
                4.9/5 on Google (150+ real customer reviews in Vancouver)
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-black">
              Reliable & Fast Plumbing in Vancouver
            </h1>
            <p className="text-lg text-black">
              24/7 licensed plumbers with upfront pricing. Drainage, heating, and renovation services guaranteed and
              precise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 self-center lg:self-start">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-lg px-6 py-7 text-base shadow-lg">
                <div className="text-left">
                  <div className="font-bold flex items-center">
                    Call Now <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                  <div className="text-xs font-normal">No Hidden Fees</div>
                </div>
              </Button>
              <Button className="bg-[#00b5e2] text-black hover:bg-[#00a1cb] rounded-lg px-6 py-7 text-base shadow-lg">
                <div className="text-left">
                  <div className="font-bold flex items-center">
                    Book Online <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                  <div className="text-xs font-normal">Check Availability</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Columna de Imágenes */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
            <div className="absolute w-[90vw] h-[90vw] max-w-[450px] max-h-[450px] lg:w-[450px] lg:h-[450px] bg-[#a1c39e] rounded-full flex items-center justify-center">
              <Image
                src="/images/fontanero.png"
                alt="Fontanero profesional"
                width={400}
                height={600}
                className="z-10 object-contain drop-shadow-2xl"
              />
            </div>
            <div className="absolute bottom-10 right-0 lg:bottom-20 lg:-right-10 w-[200px] h-[280px] bg-[#edd4e1] rounded-[100px] flex items-center justify-center overflow-hidden shadow-lg z-20">
              <Image
                src="/images/clienta.png"
                alt="Clienta satisfecha"
                width={200}
                height={300}
                className="object-cover scale-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 lg:left-1/2 lg:-translate-x-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg flex items-center gap-3 z-20">
              <div className="flex -space-x-3">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="avatar 1"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="avatar 2"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#dd7a28]">98%</div>
                <div className="text-xs text-black">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
