import Image from 'next/image'
import { Star, ArrowRight } from 'lucide-react'
import { Marquee } from '../marquee'
import { Button } from '@/components/ui/button'

export const Hero = () => {
  return (
    <div className='w-full bg-[#f6be00] text-black overflow-x-hidden px-6 min-h-svh flex items-center'>
      <div className='max-w-[1400px] w-full mx-auto py-20 lg:py-28'>
        <div className='grid lg:grid-cols-2 gap-16 items-center relative'>
          {/* Columna de Texto */}
          <div className='flex flex-col gap-6 text-center lg:text-left z-10 text-black'>
            <div className='inline-flex items-center gap-2 bg-[#d0f5da] p-2 self-center lg:self-start'>
              <Star className='w-5 h-5 text-[#eb9b4a]' fill='#eb9b4a' />
              <span className='font-medium text-sm text-black'>
                4.9/5 on Google (150+ real customer reviews in Vancouver)
              </span>
            </div>
            <h1
              className='font-extrabold leading-none max-w-[669px]'
              style={{ fontSize: 'clamp(2rem, 6vw, 88px)' }}
            >
              Reliable & Fast <br /> Plumbing in <br /> Vancouver
            </h1>
            <p
              className='max-w-[380px] lg:max-w-[521px]'
              style={{ fontSize: 'clamp(1rem, 1.5vw, 22px)' }}
            >
              24/7 licensed plumbers with upfront pricing. Drainage, heating,
              and renovation services guaranteed and precise.
            </p>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4 self-center lg:self-start max-w-[470px] w-full'>
              <Button className='bg-white text-black hover:bg-gray-200 px-6 py-9 text-base shadow-lg rounded-none leading-none'>
                <div className='text-left'>
                  <div className='font-bold flex items-center text-[22px]'>
                    Call Now <ArrowRight className='w-4 h-4 ml-2' />
                  </div>
                  <div className='text-xs font-normal'>No Hidden Fees</div>
                </div>
              </Button>
              <Button className='bg-[#00b5e2] text-black hover:bg-[#00a1cb] px-6 py-9 text-base shadow-lg rounded-none leading-none'>
                <div className='text-left'>
                  <div className='font-bold flex items-center text-[22px]'>
                    Book Online <ArrowRight className='w-4 h-4 ml-2' />
                  </div>
                  <div className='text-xs font-normal'>Check Availability</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Columna de Imágenes */}
          <div className='relative flex items-end md:gap-4 pb-20'>
            <div className='w-[90vw] h-[90vw] max-w-[360px] max-h-[490px] flex items-end justify-center relative'>
              <div className='bg-[#D0F5DA] rounded-b-full w-full h-[100vh] absolute bottom-0 left-0 right-0'></div>
              <div className='overflow-hidden rounded-b-full z-10 mt-auto relative'>
                <div className='absolute inset-0 transform -rotate-10 w-[120%]'>
                  <Marquee className='bg-[#FFA500] text-white bottom-2/4' />
                </div>
                <Image
                  src='/images/fontanero.png'
                  alt='Fontanero profesional'
                  width={400}
                  height={600}
                  className='object-contain rounded-b-full relative z-20'
                />
                <div className='absolute inset-0 z-20 transform rotate-12 w-[120%]'>
                  <Marquee className='bg-[#000000] text-white bottom-1/3 -left-5' />
                </div>
              </div>
            </div>
            <div className='w-[90vw] h-[90vw] max-w-[256px] max-h-[422px] flex items-end justify-center bg-[#EDD4E1] rounded-full overflow-hidden z-10 '>
              <Image
                src='/images/clienta.png'
                alt='Clienta satisfecha'
                width={200}
                height={300}
                className='object-[80%] rounded-b-full z-10 mt-auto bg-[#EDD4E1] w-full'
              />
            </div>
            <div className='absolute bottom-0 left-0 lg:left-auto lg:right-1/3 bg-[#fefae0] p-3 shadow-lg flex items-center gap-3 z-20'>
              <div className='flex -space-x-3'>
                <Image
                  src='/images/p1.png'
                  alt='Customer 1'
                  width={40}
                  height={40}
                  className='rounded-full border-2 border-white'
                />
                <Image
                  src='/images/p2.png'
                  alt='Customer 2'
                  width={40}
                  height={40}
                  className='rounded-full border-2 border-white'
                />
              </div>
              <div>
                <p className='font-bold text-lg text-amber-700'>98%</p>
                <p className='text-sm text-stone-600'>Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
