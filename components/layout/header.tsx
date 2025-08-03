"use client"

import type { ReactNode } from "react"
import { Grip, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Logo } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"

const NavLink = ({ children }: { children: ReactNode }) => (
  <a href="#" className="text-white hover:text-[#fec52c] transition-colors text-lg">
    {children}
  </a>
)

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed top-8 left-0 right-0 max-w-[1444px] w-full mx-auto px-6 z-20"
    >
      <nav className="bg-black mx-auto px-6 py-6 flex justify-between items-center">
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
    </motion.header>
  )
}
