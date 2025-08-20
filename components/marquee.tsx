import { Logo } from "./icons/logo";
import { Star } from "./icons/star";

const MarqueeItem = () => (
  <div className="flex items-center gap-4">
    <Logo />
    <Star />
  </div>
);

export const Marquee = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute w-full overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max gap-3 p-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <MarqueeItem key={i} />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <MarqueeItem key={i} />
        ))}
      </div>
    </div>
  );
};
