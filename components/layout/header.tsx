"use client"

import { motion } from "framer-motion"
import { Grip, Menu } from "lucide-react"
import type { ReactNode } from "react"
import Link from "next/link"
import { Logo } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"

const NavLink = ({ children, href }: { children: ReactNode; href?: string }) => {
  if (href) {
    return (
      <Link href={href} className="text-lg text-white transition-colors hover:text-[#fec52c]">
        {children}
      </Link>
    )
  }
  return <button className="text-lg text-white transition-colors hover:text-[#fec52c]">{children}</button>
}

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed top-8 right-0 left-0 z-50 mx-auto w-full max-w-[1444px] px-6"
    >
      <nav className="mx-auto flex items-center justify-between bg-black px-6 py-6">
        <Logo />
        <div className="hidden items-center space-x-8 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
        <div className="hidden md:block">
          <Grip className="h-8 w-8 text-white" />
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
