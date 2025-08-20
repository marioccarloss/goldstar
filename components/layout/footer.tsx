import { ArrowRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";

export function Footer() {
  return (
    <footer className="bg-black pt-12 text-white">
      <div className="mx-auto w-full max-w-[1444px] px-6 lg:px-8">
        {/* CTA Section */}
        <div className="my-12 bg-[#f6be00] px-8 py-12 text-black">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold md:text-5xl">
                Discuss Your
                <br />
                Needs with Us
              </h2>
            </div>
            <div className="flex-grow text-center md:pl-8 md:text-left">
              <p className="mx-auto max-w-md md:mx-0">
                Expert Solutions for Every Home Need — With Lasting Results & Guaranteed Satisfaction
              </p>
            </div>
            <div>
              <Link href="/contact">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-black transition-colors duration-300 hover:bg-black hover:text-[#f6be00]">
                  <ArrowRight className="h-8 w-8" />
                  <span className="sr-only">Contact Us</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="text-center md:text-left lg:col-span-2">
            <div className="mb-4 inline-block">
              <Logo />
            </div>
            <p className="mx-auto mb-6 max-w-xs text-sm text-zinc-400 md:mx-0">
              Successfully powered countless plumbing projects with precision and care.
            </p>
            <p className="mb-2 text-sm text-zinc-400">Follow us:</p>
            <div className="flex justify-center space-x-4 md:justify-start">
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Facebook />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Twitter />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Linkedin />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Instagram />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Company</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Services</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Drainage
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Heating
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Renovations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Emergency
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Help</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Tips & Tricks
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  24/7
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="flex flex-col items-center justify-between border-t border-zinc-800 py-6 text-sm text-zinc-400 md:flex-row">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Gold Star Plumbing. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white">
              Terms & Condition
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
