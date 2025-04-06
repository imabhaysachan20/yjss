"use client"
import { ArrowRightIcon, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTranslation } from "@/contexts/TranslationContext";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-[#F53D3D] text-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl sm:text-2xl font-bold">{t("footer.organizationName")}</h1>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                {t("footer.address")}
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Phone className="w-5 h-5 flex-shrink-0" />
                {t("footer.phone")}
              </p>
              <p className="flex gap-x-1 mt-2 text-sm sm:text-base">
                <Mail className="w-5 h-5 flex-shrink-0" />
                {t("footer.email")}
              </p>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{t("footer.quickLinks")}</h1>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/"}>{t("common.home")}</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/contact"}>{t("common.contact")}</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/gallery/images"}>{t("common.gallery")}</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/join/new"}>{t("footer.membership")}</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/login"}>{t("footer.adminLogin")}</Link>
              </p>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{t("footer.popularLinks")}</h1>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/president"}>{t("common.president")}</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/about/organisation"}>{t("about.aboutOrg")}</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/about/ideology"}>{t("about.ideology")}</Link>
              </p>
              <p className="flex gap-x-1 mt-4 text-sm sm:text-base">
                <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
                <Link href={"/about/leadership"}>{t("about.leadership")}</Link>
              </p>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{t("footer.followUs")}</h1>
              <div className="flex flex-row gap-x-3 mt-2">
                <Link href={"https://twitter.com/Yjssofficial?t=0Hl5WsKcSwMc6ZTuDWAgnA&s=09"}>
                  <FaTwitter />
                </Link>
                <Link href={"https://www.facebook.com/profile.php?id=100080998327055"}>
                  <FaFacebook />
                </Link>
                <Link href={"http://localhost:3000/"}>
                  <FaYoutube />
                </Link>
                <Link href={"https://www.instagram.com/invites/contact/?i=15jlewpdj562k&utm_content=lsrolsh"}>
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-[#b32c2c] text-white py-2">
        <Container>
          <p className="text-sm sm:text-lg text-center">
            {t("footer.copyright")}
          </p>
        </Container>
      </div>
    </>
  );
};

export default Footer;
