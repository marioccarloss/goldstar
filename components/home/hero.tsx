import Image from 'next/image'
import { Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Hero = () => {
  return (
    <div className='w-full bg-[#f6be00] text-black overflow-x-hidden px-6 min-h-svh flex items-center'>
      <div className='max-w-[1400px] w-full mx-auto py-16 lg:py-24'>
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
              className='max-w-[521px]'
              style={{ fontSize: 'clamp(1rem, 2vw, 22px)' }}
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
              <div className='overflow-hidden rounded-b-full z-10 mt-auto'>
                <Image
                  src='/images/fontanero.png'
                  alt='Fontanero profesional'
                  width={400}
                  height={600}
                  className='object-contain rounded-b-full z-10 bg-[#D0F5DA]'
                />
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
          </div>
        </div>
      </div>
    </div>
  )
}
