import Link from 'next/link'
import { Logo } from '@/components/icons/logo'

export function Footer() {
  return (
    <footer className='bg-zinc-900 text-white'>
      <div className='container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
        <div>
          <div className='flex justify-center md:justify-start mb-4'>
            <Logo />
          </div>
          <p className='text-zinc-400 text-sm'>
            Reliable & Fast Plumbing in Vancouver.
          </p>
        </div>
        <div>
          <h3 className='font-bold text-lg mb-4'>Quick Links</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link
                href='#'
                className='text-zinc-300 hover:text-amber-400 transition-colors'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='text-zinc-300 hover:text-amber-400 transition-colors'
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='text-zinc-300 hover:text-amber-400 transition-colors'
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='text-zinc-300 hover:text-amber-400 transition-colors'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold text-lg mb-4'>Contact Us</h3>
          <div className='text-zinc-300 text-sm space-y-1'>
            <p>Vancouver, BC, Canada</p>
            <p>contact@goldstarplumbing.ca</p>
            <p>(604) 555-1234</p>
          </div>
        </div>
      </div>
      <div className='bg-black py-4'>
        <div className='container mx-auto px-6 text-center text-zinc-500 text-xs'>
          <p>
            &copy; {new Date().getFullYear()} Gold Star Plumbing. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
