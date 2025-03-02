"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
const images = [
  'http://yjss.org/img/carousel-1.jpg',
  'http://yjss.org/img/carousel-2.jpg',
  'http://yjss.org/img/carousel-3.jpg',
]
function Slider() {
  return (
    <Carousel opts={{
      loop:true
    }} plugins={[
      Autoplay({
        delay: 3500,
        stopOnInteraction:false
      }),]} className={'w-full max-w-screen'}>
  <CarouselContent>
    
    
      {images.map((img,idx)=>{
        return <CarouselItem key={idx} > <div> <Image 
        src={img}
        
        width={1200}
        height={400}
        quality={100}
        className="w-full h-full object-contain md:object-center" 
        alt="hero" 
        />         
        </div>
        </CarouselItem>
      }
      )
      }
    
    
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

  )
}

export default Slider
