"use client";

import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Grip, Instagram, Linkedin, Menu, Twitter, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

const NavLink = ({ children, href, isActive }: { children: ReactNode; href?: string; isActive?: boolean }) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`text-lg transition-colors hover:text-[#fec52c] ${
          isActive ? "font-semibold text-[#fec52c]" : "text-white"
        }`}
      >
        {children}
      </Link>
    );
  }
  return <button className="text-lg text-white transition-colors hover:text-[#fec52c]">{children}</button>;
};

const MobileNavLink = ({
  children,
  href,
  onClick,
  isActive,
}: {
  children: ReactNode;
  href: string;
  onClick: () => void;
  isActive?: boolean;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block transform leading-none font-bold transition-all duration-300 hover:translate-x-2 hover:text-[#f6be00] active:text-[#f6be00] ${
        isActive ? "text-[#f6be00]" : "text-white"
      }`}
      style={{ fontSize: "clamp(3rem, 6vw, 88px)" }}
    >
      {children}
    </Link>
  );
};

const SocialLink = ({ icon: Icon, href }: { icon: any; href: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transform text-white transition-all duration-300 hover:scale-110 hover:text-[#f6be00]"
    >
      <Icon className="h-8 w-8" />
    </a>
  );
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed top-8 right-0 left-0 z-50 mx-auto w-full max-w-[1444px] px-6"
      >
        <nav className="mx-auto flex items-center justify-between bg-black px-6 py-6">
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden items-center space-x-8 md:flex">
            <NavLink href="/" isActive={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/services" isActive={pathname === "/services"}>
              Services
            </NavLink>
            <NavLink href="/about" isActive={pathname === "/about"}>
              About
            </NavLink>
            <NavLink href="/contact" isActive={pathname === "/contact"}>
              Contact
            </NavLink>
          </div>
          <div className="hidden md:block">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-8 w-8 text-white" /> : <Grip className="h-8 w-8 text-white" />}
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col bg-black"
          >
            {/* Close button */}
            <div className="absolute top-8 right-6 z-[10000]">
              <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>

            {/* Main navigation */}
            <div className="flex flex-1 flex-col items-center justify-center space-y-8">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <MobileNavLink href="/" onClick={closeMobileMenu} isActive={pathname === "/"}>
                  Home
                </MobileNavLink>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <MobileNavLink href="/services" onClick={closeMobileMenu} isActive={pathname === "/services"}>
                  Services
                </MobileNavLink>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <MobileNavLink href="/about" onClick={closeMobileMenu} isActive={pathname === "/about"}>
                  About
                </MobileNavLink>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <MobileNavLink href="/contact" onClick={closeMobileMenu} isActive={pathname === "/contact"}>
                  Contact
                </MobileNavLink>
              </motion.div>
            </div>

            {/* Social media links */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center space-x-8 pb-16"
            >
              <SocialLink icon={Facebook} href="https://facebook.com" />
              <SocialLink icon={Instagram} href="https://instagram.com" />
              <SocialLink icon={Twitter} href="https://twitter.com" />
              <SocialLink icon={Linkedin} href="https://linkedin.com" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
