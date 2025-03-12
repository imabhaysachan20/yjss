import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import Container from "./Container";

const TopStrip = () => {
  return (
    <div className="bg-[rgb(245,61,61)] text-white py-1 px-4 font-bold">
      <Container>
      <div className="flex items-center justify-between p-0.5">
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
          <Link href="https://www.facebook.com/profile.php?id=100080998327055" className="hover:text-blue-500">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="https://twitter.com/Yjssofficial?t=0Hl5WsKcSwMc6ZTuDWAgnA&s=09" className="hover:text-blue-400">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="https://www.instagram.com/invites/contact/?i=15jlewpdj562k&utm_content=lsrolsh" className="hover:text-pink-500">
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default TopStrip;
