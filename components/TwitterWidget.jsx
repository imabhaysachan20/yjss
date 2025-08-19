"use client"
import React from 'react';
import { MousePointerClickIcon } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from '@/contexts/TranslationContext';
function TwitterWidget() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto p-6 justify-center rounded-xl mb-16">
     <h1 className="text-md md:text-3xl relative left-1/2 -translate-x-1/2 font-bold bg-yellow-200 px-4 py-2 inline-block rounded-md mb-16 mt-8 md:mt-16 md:mb-32">
    <div className="flex items-center gap-x-2">

          <MousePointerClickIcon className="relative -top-0.5 w-4 md:w-8"/>
          <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        t('social.Heading1'),
        5000, // wait 1s before replacing "Mice" with "Hamsters"
        t('social.Heading2'),,3000
      ]}
      wrapper="span"
      speed={50}
      style={{ display: 'inline-block' ,textAlign: 'center'}}
      repeat={Infinity}
    />
          </div>
        </h1>
      <div className="flex flex-col md:flex-row flex-wrap md:justify-evenly gap-8 w-full">
        <div className="rounded-lg mb-16 md:mb-0 shadow-md transition-all bg-white hover:shadow-lg">
          <iframe
  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fyuvajantasangharssamiti&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
  height="500"
  class="border-none overflow-hidden w-[270px] md:w-[340px]"
  scrolling="no"
  frameborder="0"
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  title="Yuvajanta Sangharssamiti Facebook Page"
></iframe>

        </div>
        <div className="max-w-md overflow-hidden shadow-md transition-all bg-white hover:shadow-lg">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FManas812TiwAri%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            
            height="500"
            className="border-none overflow-hidden w-[270px] md:w-[340px]"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Manas Tiwari Facebook Page"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default TwitterWidget;
