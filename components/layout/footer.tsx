import Link from 'next/link'
import { Logo } from '@/components/icons/logo'
import {
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className='bg-black text-white pt-12'>
      <div className=' max-w-[1444px] w-full mx-auto px-6 lg:px-8'>
        {/* CTA Section */}
        <div className='bg-[#f6be00] text-black py-12 px-8 my-12'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <div className='text-center md:text-left'>
              <h2 className='text-4xl md:text-5xl font-bold'>
                Discuss Your
                <br />
                Needs with Us
              </h2>
            </div>
            <div className='flex-grow text-center md:text-left md:pl-8'>
              <p className='max-w-md mx-auto md:mx-0'>
                Expert Solutions for Every Home Need — With Lasting Results &
                Guaranteed Satisfaction
              </p>
            </div>
            <div>
              <Link href='/contact'>
                <span className='flex items-center justify-center w-20 h-20 border-2 border-black rounded-full hover:bg-black hover:text-[#f6be00] transition-colors duration-300'>
                  <ArrowRight className='w-8 h-8' />
                  <span className='sr-only'>Contact Us</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12'>
          <div className='lg:col-span-2 text-center md:text-left'>
            <div className='inline-block mb-4'>
              <Logo />
            </div>
            <p className='text-zinc-400 text-sm mb-6 max-w-xs mx-auto md:mx-0'>
              Successfully powered countless plumbing projects with precision
              and care.
            </p>
            <p className='text-zinc-400 text-sm mb-2'>Follow us:</p>
            <div className='flex justify-center md:justify-start space-x-4'>
              <Link href='#' className='text-zinc-400 hover:text-white'>
                <Facebook />
              </Link>
              <Link href='#' className='text-zinc-400 hover:text-white'>
                <Twitter />
              </Link>
              <Link href='#' className='text-zinc-400 hover:text-white'>
                <Linkedin />
              </Link>
              <Link href='#' className='text-zinc-400 hover:text-white'>
                <Instagram />
              </Link>
            </div>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Company</h3>
            <ul className='space-y-2 text-sm text-zinc-400'>
              <li>
                <Link href='#' className='hover:text-white'>
                  Features
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:text-white'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white'>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white'>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Services</h3>
            <ul className='space-y-2 text-sm text-zinc-400'>
              <li>
                <Link href='#' className='hover:text-white'>
                  Drainage
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white'>
                  Heating
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white'>
                  Renovations
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white'>
                  Emergency
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Help</h3>
            <ul className='space-y-2 text-sm text-zinc-400'>
              <li>
                <Link href='#' className='hover:text-white'>
                  Tips & Tricks
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white'>
                  Support
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white'>
                  24/7
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub Footer */}
        <div className='border-t border-zinc-800 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400'>
          <p className='mb-4 md:mb-0'>
            &copy; {new Date().getFullYear()} Gold Star Plumbing. All Rights
            Reserved.
          </p>
          <div className='flex space-x-6'>
            <Link href='#' className='hover:text-white'>
              Terms & Condition
            </Link>
            <Link href='#' className='hover:text-white'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
