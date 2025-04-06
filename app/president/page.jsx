"use client"
import { Feather } from "lucide-react";
import React from "react";
import { useTranslation } from "../../contexts/TranslationContext";

const PresidentQuote = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-bold pt-10 pb-8">
          <Feather />
          {t("president.ideologyHeading")}
        </h1>
        <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
      </div>

      <div className="flex items-center justify-center pb-24">
        <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg max-w-3xl relative">
          {/* Image Section */}
          <div className="w-2/3 md:w-1/2 relative">
            <img
              src="/president.png"
              alt={t("president.imageAlt")}
              className="w-full h-auto object-cover opacity-80"
            />
            <div className="bg-[rgba(255,255,255,0.8)] p-2 rounded-2xl shadow-2xs w-full absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 flex items-center justify-center flex-col">
              <p className="text-gray-800 font-bold text-lg">
                {t("president.name")}
              </p>
              <p>{t("president.title")}</p>
            </div>
          </div>

          {/* Text Section */}
          <div className="ml-4 w-full mt-14 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t("president.messageHeading")}
            </h2>
            <p className="text-gray-600 mb-16 text-lg">
              {t("president.message")}
            </p>
            <div className="text-gray-600 mt-10 italic leading-relaxed relative text-justify">
              <span className="absolute -top-15 -left-0 text-[6rem] text-gray-300 font-serif -translate-x-3 -translate-y-4 select-none">
                &quot;
              </span>
              <p className="font-bold text-lg mb-2">
                {t("president.subheading1")}
              </p>
              {t("president.paragraph1")}
              <p className="font-bold text-lg my-4">
                {t("president.subheading2")}
              </p>
              {t("president.paragraph2")}
              <p className="font-bold text-lg my-4">
                {t("president.subheading3")}
              </p>
              {t("president.paragraph3")}
              <p className="font-bold text-lg my-4">
                {t("president.subheading4")}
              </p>
              {t("president.paragraph4")}
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold mb-2">
                  {t("president.slogan1")}
                </p>
                <p className="text-lg font-semibold">{t("president.slogan2")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PresidentQuote;