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
      link:"/"
    },
    {
      name:"सहयोग करें",
      icon:<HelpingHand/>,
      link:"/"
    },
    {
      name:"सक्रिय सदस्य",
      icon:<ActivitySquare/>,
      link:"/"
    },
  ]




  return (
    <div className="flex bg-white relative -top-[25px] rounded justify-between w-[80%] m-auto text-2xl font-bold h-[200px] items-center shadow-2xl">
      {options.map((option)=>{
        return (<Link className="transition-all duration-700 hover:scale-[1.03] hover:gap-y-3 hover:bg-gray-100 flex flex-col h-full justify-center grow-1 items-center"  href={option.link} key={option.name}><div  className="h-full flex flex-col justify-center items-center  gap-y-5 ">
          {option.icon}
          {option.name}
          </div>
          </Link>)
      })}
    </div>
  );
};

export default Banner_below_options;
