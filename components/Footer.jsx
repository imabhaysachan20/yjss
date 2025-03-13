import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import Container from "./Container";

const Footer = () => {
  return (
    <>
      <div className="bg-[#F53D3D] text-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl sm:text-2xl font-bold">युवा जनता संघर्ष संगठन</h1>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                उत्तर प्रदेश लखनऊ,कानपुर
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Phone className="w-5 h-5 flex-shrink-0" />
                +91-7376366014
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Mail className="w-5 h-5 flex-shrink-0" />
                yuvajantasangharssamiti@gmail.com
              </p>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">त्वरित सम्पर्क</h1>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                उत्तर प्रदेश लखनऊ,कानपुर
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Phone className="w-5 h-5 flex-shrink-0" />
                +91-7376366014
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Mail className="w-5 h-5 flex-shrink-0" />
                yuvajantasangharssamiti@gmail.com
              </p>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">लोकप्रिय सम्पर्क</h1>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                उत्तर प्रदेश लखनऊ,कानपुर
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Phone className="w-5 h-5 flex-shrink-0" />
                +91-7376366014
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Mail className="w-5 h-5 flex-shrink-0" />
                yuvajantasangharssamiti@gmail.com
              </p>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">समाचार पत्रिका</h1>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                उत्तर प्रदेश लखनऊ,कानपुर
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Phone className="w-5 h-5 flex-shrink-0" />
                +91-7376366014
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Mail className="w-5 h-5 flex-shrink-0" />
                yuvajantasangharssamiti@gmail.com
              </p>
            </div>
          </div>
        </Container>
      </div>
  
      <div className="bg-[#b32c2c] text-white py-2">
        <Container>
          <p className="text-sm sm:text-lg text-center">
            © युवा जनता संघर्ष संगठन,सर्वाधिकार सुरक्षित।
          </p>
        </Container>
      </div>
    </>
  );
};

export default Footer;
