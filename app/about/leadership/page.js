import Container from '@/components/Container';
import React from 'react'
import { FaPeopleCarry } from 'react-icons/fa'
function page() {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpeg",
  ];

  return (
    <div>
 <div className="flex items-center flex-col">
    <h1 className="text-4xl font-bold pt-10 pb-8"><FaPeopleCarry></FaPeopleCarry> हमारा नेतृत्व </h1>
    <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
    </div>
    <Container>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((src, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={src}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-full grayscale object-cover hover:scale-105 hover:grayscale-0 transition-all duration-400"
          />
        </div>
      ))}
    </div>
    </Container>
    </div>
  )
}

export default page
