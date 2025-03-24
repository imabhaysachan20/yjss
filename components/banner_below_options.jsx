import { ActivitySquare, HelpingHand, Icon, NotebookPen, Pointer } from "lucide-react";
import Link from "next/link";

import React from "react";

const Banner_below_options = () => {
  const options = [
    {
      name:"ऑनलाइन सदास्यता",
      icon:<Pointer/>,
      link:"/join/new"
    },
    {
      name:"संकल्प पत्र",
      icon:<NotebookPen/>,
      link:"/join/sankalppatra"
    },
    {
      name:"सहयोग करें",
      icon:<HelpingHand/>,
      link:"/join/help"
    },
    {
      name:"सक्रिय सदस्य",
      icon:<ActivitySquare/>,
      link:"/join/permanent"
    },
  ]




  return (
    <div className="flex bg-white relative -top-[5px] md:-top-[25px] rounded justify-between w-[80%] m-auto text-md  md:text-2xl font-bold h-[150px] md:h-[200px] items-center w-full shadow-2xl">
      {options.map((option)=>{
        return (<Link className="transition-all duration-700 hover:scale-[1.03] hover:gap-y-3 hover:bg-gray-100 flex flex-col h-full justify-center md:grow-1 items-center"  href={option.link} key={option.name}><div  className="h-full flex flex-col justify-center items-center gap-y-5 md:text-2xl text-center px-2 active:bg-gray-200">
          {option.icon}
          {option.name}
          </div>
          </Link>)
      })}
    </div>
  );
};

export default Banner_below_options;
