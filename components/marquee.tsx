import { Star } from './icons/star'
import { Logo } from './icons/logo'

export const Marquee = ({ className }: { className?: string }) => {
  const marqueeItems = (
    <>
      <Logo />
      <Star />
      <Logo />
      <Star />
      <Logo />
      <Star />
      <Logo />
      <Star />
    </>
  )

  return (
    <div className={`absolute w-full overflow-hidden ${className}`}>
      <div className='flex w-[200%] animate-marquee'>
        <div className='flex items-center justify-around w-1/2 gap-3'>
          {marqueeItems}
        </div>
        <div
          className='flex items-center justify-around w-1/2 gap-3'
          aria-hidden='true'
        >
          {marqueeItems}
        </div>
      </div>
    </div>
  )
}
