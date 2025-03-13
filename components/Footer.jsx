import { ArrowRightIcon, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

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
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/"}>होम</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/contact"}>संपर्क करें</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/"}>गैलरी</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/join/new"}>सदस्यता ग्रहण करें</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/"}>एडमिन लागइन</Link>
              </p>
              
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">लोकप्रिय सम्पर्क</h1>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/"}>होम</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/contact"}>संपर्क करें</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/"}>गैलरी</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/join/new"}>सदस्यता ग्रहण करें</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/"}>एडमिन लागइन</Link>
              </p>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">फालो करे</h1>
              <div className="flex flex-row gap-x-3 mt-2">
                <Link href={"https://twitter.com/Yjssofficial?t=0Hl5WsKcSwMc6ZTuDWAgnA&s=09"}>
                <FaTwitter></FaTwitter>
                </Link>
                <Link href={"https://www.facebook.com/profile.php?id=100080998327055"}>
                <FaFacebook></FaFacebook>
                </Link>
                <Link href={"http://localhost:3000/"}>
                <FaYoutube></FaYoutube>
                </Link>
                <Link href={"https://www.instagram.com/invites/contact/?i=15jlewpdj562k&utm_content=lsrolsh"}>
                <FaInstagram></FaInstagram>
                </Link>
              </div>
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
