"use client";
import { ActivitySquare, HelpingHand, NotebookPen, Pointer } from "lucide-react";
import Link from "next/link";
import { useTranslation } from '@/contexts/TranslationContext';

const Banner_below_options = () => {
  const { t } = useTranslation();

  const options = [
    {
      name: t('banner.onlineMembership'),
      icon: <Pointer/>,
      link: "/join/new"
    },
    {
      name: t('banner.pledgeForm'),
      icon: <NotebookPen/>,
      link: "/join/sankalppatra"
    },
    {
      name: t('banner.contribute'),
      icon: <HelpingHand/>,
      link: "/join/help"
    },
    {
      name: t('banner.activeMembers'),
      icon: <ActivitySquare/>,
      link: "/join/permanent"
    },
  ];

  return (
    <div className="flex bg-white relative -top-[5px] md:-top-[25px] rounded justify-between w-[80%] m-auto text-md  md:text-2xl font-bold h-[150px] md:h-[200px] items-center w-full shadow-2xl">
      {options.map((option) => (
        <Link 
          className="transition-all duration-700 hover:scale-[1.03] hover:gap-y-3 hover:bg-gray-100 flex flex-col h-full justify-center md:grow-1 items-center"  
          href={option.link} 
          key={option.name}
        >
          <div className="h-full flex flex-col justify-center items-center gap-y-5 text-xs md:text-2xl text-center px-2 active:bg-gray-200">
            {option.icon}
            {option.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Banner_below_options;