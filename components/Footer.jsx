import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import Container from "./Container";

const Footer = () => {
  return (
    <>
    <div className="bg-[#F53D3D] text-white grid grid-cols-4 p-16">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold">युवा जनता संघर्ष संगठन</h1>
    <p className="flex gap-x-1 mt-4">
      <MapPin></MapPin>
      उत्तर प्रदेश लखनऊ,कानपुर
    </p>
    <p className="flex gap-x-1 mt-2">
      <Phone></Phone>
      +91-7376366014 
    </p>
    <p className="flex gap-x-1 mt-2">
      <Mail></Mail>
      yuvajantasangharssamiti@gmail.com
    </p>
      </div>
      <div>
      <h1 className="text-2xl font-bold">त्वरित सम्पर्क</h1>
    <p className="flex gap-x-1 mt-4">
      <MapPin></MapPin>
      उत्तर प्रदेश लखनऊ,कानपुर
    </p>
    <p className="flex gap-x-1 mt-2">
      <Phone></Phone>
      +91-7376366014 
    </p>
    <p className="flex gap-x-1 mt-2">
      <Mail></Mail>
      yuvajantasangharssamiti@gmail.com
    </p>
      </div>
      <div>
      <h1 className="text-2xl font-bold">लोकप्रिय सम्पर्क</h1>
    <p className="flex gap-x-1 mt-4">
      <MapPin></MapPin>
      उत्तर प्रदेश लखनऊ,कानपुर
    </p>
    <p className="flex gap-x-1 mt-2">
      <Phone></Phone>
      +91-7376366014 
    </p>
    <p className="flex gap-x-1 mt-2">
      <Mail></Mail>
      yuvajantasangharssamiti@gmail.com
    </p>
      </div>
      <div>
      <h1 className="text-2xl font-bold">समाचार पत्रिका</h1>
    <p className="flex gap-x-1 mt-4">
      <MapPin></MapPin>
      उत्तर प्रदेश लखनऊ,कानपुर
    </p>
    <p className="flex gap-x-1 mt-2">
      <Phone></Phone>
      +91-7376366014 
    </p>
    <p className="flex gap-x-1 mt-2">
      <Mail></Mail>
      yuvajantasangharssamiti@gmail.com
    </p>
      </div>
      </div>
  
  <div className="bg-[#b32c2c] text-white py-2 text-lg text-center">
    <Container>
  © युवा जनता संघर्ष संगठन,सर्वाधिकार सुरक्षित। 
  </Container>
  </div>
      </>
  );
};

export default Footer;
