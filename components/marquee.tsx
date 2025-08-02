import { Star } from './icons/star'
import { Logo } from './icons/logo'

const MarqueeItem = () => (
  <div className='flex items-center gap-4'>
    <Logo />
    <Star />
  </div>
)

export const Marquee = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute w-full overflow-hidden ${className}`}>
      <div className='flex w-max animate-marquee p-2 gap-3'>
        {Array.from({ length: 15 }).map((_, i) => (
          <MarqueeItem key={i} />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <MarqueeItem key={i} />
        ))}
      </div>
    </div>
  )
}
