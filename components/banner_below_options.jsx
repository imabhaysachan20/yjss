import { Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Banner_below_options = () => {
  const options = [
    {
      name:"ऑनलाइन सदास्यता",
      icon:<Icon/>,
      link:"/"
    },
    {
      name:"संकल्प पत्र",
      icon:<Icon/>,
      link:"/"
    },
    {
      name:"सहयोग करें",
      icon:<Icon/>,
      link:"/"
    },
    {
      name:"सक्रिय सदस्य",
      icon:<Icon/>,
      link:"/"
    },
  ]




  return (
    <div className="flex bg-white relative -top-[25px] rounded justify-between w-[80%] m-auto text-2xl font-bold h-[200px] items-center shadow-2xl">
      {options.map((option)=>{
        return (<div key={option.name} className="h-full flex flex-col justify-center grow-1 items-center hover:bg-gray-100 transition-all duration-150">
          {option.name}
          </div>)
      })}
    </div>
  );
};

export default Banner_below_options;
