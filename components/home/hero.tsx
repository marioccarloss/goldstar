import Image from 'next/image'
import { Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Hero = () => {
  return (
    <div className='w-full bg-[#f6be00] text-black overflow-x-hidden px-6 min-h-svh flex items-center py-24'>
      <div className='max-w-[1400px] w-full mx-auto py-16 lg:py-24'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
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
              Reliable & Fast Plumbing in Vancouver
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
          <div className='relative h-[500px] lg:h-[600px] flex items-center justify-center'>
            <div className='absolute w-[90vw] h-[90vw] max-w-[450px] max-h-[450px] lg:w-[450px] lg:h-[450px] bg-[#a1c39e] rounded-full flex items-center justify-center'>
              <Image
                src='/images/fontanero.png'
                alt='Fontanero profesional'
                width={400}
                height={600}
                className='z-10 object-contain drop-shadow-2xl'
              />
            </div>
            <div className='absolute bottom-10 right-0 lg:bottom-20 lg:-right-10 w-[200px] h-[280px] bg-[#edd4e1] rounded-[100px] flex items-center justify-center overflow-hidden shadow-lg z-20'>
              <Image
                src='/images/clienta.png'
                alt='Clienta satisfecha'
                width={200}
                height={300}
                className='object-cover scale-110'
              />
            </div>
            <div className='absolute bottom-0 left-0 lg:left-1/2 lg:-translate-x-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg flex items-center gap-3 z-20'>
              <div className='flex -space-x-3'>
                <Image
                  src='/placeholder.svg?height=40&width=40'
                  alt='avatar 1'
                  width={40}
                  height={40}
                  className='rounded-full border-2 border-white'
                />
                <Image
                  src='/placeholder.svg?height=40&width=40'
                  alt='avatar 2'
                  width={40}
                  height={40}
                  className='rounded-full border-2 border-white'
                />
              </div>
              <div>
                <div className='text-2xl font-bold text-[#dd7a28]'>98%</div>
                <div className='text-xs text-black'>Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
