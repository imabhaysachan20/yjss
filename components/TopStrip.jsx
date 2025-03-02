import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import Container from "./Container";

const TopStrip = () => {
  return (
    
    <div className="bg-[rgb(245,61,61)] text-white py-2 px-4">
      <Container>
      <div className="flex items-center justify-between p-1">
        {/* Left Section - Contact Info */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            
            <Mail className="w-4 h-4" />
            <span>yuvajantasangharssamiti@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+91-7376366014 </span>
          </div>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-blue-500">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-blue-400">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-pink-500">
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default TopStrip;
