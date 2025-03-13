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
    <div className="relative w-full">
      <Carousel 
        opts={{
          loop: true,
          align: "start",
        }} 
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false
          }),
        ]} 
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
                <Image 
                  src={img}
                  fill
                  priority={idx === 0}
                  quality={100}
                  className="object-cover"
                  alt={`Slide ${idx + 1}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  )
}

export default Slider
